const convertBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            const result = fileReader.result?.toString();
            resolve(result ? result : '');
        };

        fileReader.onerror = (error) => {
            console.error('Error reading file:', error);
            reject(error);
        };
    });
};

export default convertBase64;
