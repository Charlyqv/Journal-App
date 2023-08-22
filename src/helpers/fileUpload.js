

export const fileUpload = async( file ) => {
  if ( !file ) throw new Error('No tenemos ningún archivo a subir');

  const cloudUrl = 'https://api.cloudinary.com/v1_1/dfqtu8ivc/upload';

  const formData = new FormData();  
  formData.append('upload_preset','react-journal');
  formData.append('file',file);

  try {

    const resp = await fetch( cloudUrl, {
      method: 'POST',
      body: formData
    });

    console.log("🚀 ~ file: fileUpload.js:18 ~ fileUpload ~ resp:", resp)
    if( !resp.ok ) throw new Error('No se pudo subir la imagen');

    const cloudResp = await resp.json();
    console.log("🚀 ~ file: fileUpload.js:23 ~ fileUpload ~ cloudResp:", cloudResp);

    return cloudResp.secure_url;
    
    
  } catch (error) {
    console.log("🚀 ~ file: fileUpload.js:15 ~ fileUpload ~ error:", error);
    throw new Error( error.message );
  }
}