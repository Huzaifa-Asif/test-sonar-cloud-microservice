const fs = require('fs');
const axios = require('axios');
const md5 = require('md5');
const S3 = require('aws-sdk/clients/s3');
const FileType = require('file-type');

const downloadAttachment = async ({ url, path, auth = null, oauth = null, headers = null }) => {
    try{
        const writer = fs.createWriteStream(path);

        const { response: data } = await axios.get(url, {
            responseType: 'stream',
            ...(auth && { auth }),
            ...(oauth && { auth: {
                    username: oauth.consumer_key,
                    password: oauth.consumer_secret
                },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${oauth.token} ${oauth.token_secret}`
                }
            }),
        });
        data.pipe(writer);

        return writer.on('finish', function () {
            writer.close();
            resolve(path);
        }).on('error', function (e) {
            fs.unlink(path);
            console.log(e);
            reject(e);
        });

    }catch (e) {
        console.log(e);
        throw new Error(e);
    }
};

const uploadFileToBucket = async (key, filePath, mime = null) => {
    try {
        const store = process.env.APP_ENV === 'local'
            ? new S3({
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                region: process.env.S3_REGION
            })
            : new S3();

        const fileContent = fs.readFileSync(filePath);
        // Setting up S3 upload parameters
        const params = {
            Bucket: process.env.S3_BUCKET,
            Location: process.env.S3_REGION,
            Key: escape(key), // File name you want to save as in S3
            Body: fileContent,
            ...(mime && { ContentType: mime }),
            ContentDisposition: 'inline',
            ACL: 'public-read'
        };

        const response = await store.upload(params).promise();
        if (response && (response.key || response.Key))
            return encodeURI(response.key || response.Key);
        return null;
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        return null;
    } finally {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
};

const uploadAttachment = async (bucketKey, { url, headers = null, auth = null, oauth = null, fileName = null, mimeType = null }) => {
    try {
        const path = `${require('os').tmpdir()}/${md5(url)}`;
        const download = await downloadAttachment({ url, path, auth, oauth, headers });
        if (download) {
            const props = await getFileProps({ url, headers, fileName, mimeType, auth, oauth });
            fileName = (props.fileName && `/${props.fileName.split('.')[0]}` || '') + (props.ext && `.${props.ext}` || '');
            return await uploadFileToBucket(bucketKey, path, props.mimeType);
        }
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Error from updateAttachment:');
        // eslint-disable-next-line no-console
        console.error(e);
        throw e;
    }
};

const getFileProps = async ({ url, headers = null, fileName = null, mimeType = null, auth = null, oauth = null }) => {
    const response = await axios({
        method:'get',
        url,
        ...(auth && { auth }),
        ...(oauth && { auth: {
                username: oauth.consumer_key,
                password: oauth.consumer_secret
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${oauth.token} ${oauth.token_secret}`
            }
        }),
        ...(headers && { headers }),
        responseType: 'stream'
    });
    const { fileType = null } = await FileType.fromStream(response.data) || {};

    const props = fileType;
    return {
        ext: (props && props.ext) || null,
        size: response.headers['content-length'] ? Number(response.headers['content-length']) : null,
        mimeType: mimeType || (props && props.mime) || response.headers['content-type'] || null,
        fileName: fileName || null
    };
};

module.exports = {
    uploadAttachment
};
