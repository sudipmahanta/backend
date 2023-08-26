function generateUniqueID() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let uniqueID = '';
    
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      uniqueID += characters.charAt(randomIndex);
    }
    
    return uniqueID;
  }
  function generateVehicleUUID() {
    const characters = 'abcdefghijklmnoparztuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-';
    let vehicleUUID = '';
    
    for (let i = 0; i < 16; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      vehicleUUID += characters.charAt(randomIndex);
    }
    
    return vehicleUUID;
  }

  const generatedUserID = generateUniqueID();
  const genVehicleUUID = generateVehicleUUID();

  module.exports = {
    generatedUserID,
    genVehicleUUID, 
  }