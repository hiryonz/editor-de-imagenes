async function compressImage(file) {

  return new Promise((resolve, reject) => {
    new Compressor(file, {
        quality: 1,
        maxWidth: 1920,
        maxHeight: 1920,
        success(result) {
            console.log('Tamaño original de la imagen:', (file.size / 1024).toFixed(2), 'KB');
            console.log('Tamaño comprimido:', (result.size / 1024).toFixed(2), 'KB');
            resolve(result);
        },
        error(err) {
            console.error('Error al comprimir:', err);
            alert('No se pudo comprimir la imagen. Intente con una imagen más pequeña.');
            reject(err);
        },
    });
  });
}

/*
async function compressImageBrowser(file) {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
  
    try {
      const compressedFile = await imageCompression(file, options);
      console.log('tamaño original de la imagen con browser:', file.size / 1024, 'KB');
      console.log('tamaño comprimdo con browser:', compressedFile.size / 1024, 'KB');
  
      return compressedFile;
    } catch (error) {
      console.error('Error al comprimir :', error);
    }
}
*/