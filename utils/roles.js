class UserRoles {
    /// [admin] is responsible for managing office operations, handling correspondence, and supporting staff for efficient workflow.
    static get admin() {
      return "admin";
    }
  
    /// [contentAdmin] managing and organizing digital content, ensuring its accuracy, relevance, and proper placement within a website or platform.
    static get contentAdmin() {
      return "contentadmin";
    }
  
    /// [contentWriter] is the person responsible for crafting engaging content, meeting job expectations diligently.
    static get contentWriter() {
      return "contentwriter";
    }
  
    /// [driver] is the user who driver's vehicle owned by [tipperOwner].
    static get driver() {
      return "driver";
    }
  
    /// [superAdmin] has unrestricted access and control over entire system operations.
    static get superAdmin() {
      return "superadmin";
    }
  
    /// [tipperOwner] is the user who owns trucks.
    static get tipperOwner() {
      return "tipperowner";
    }
  }
  
  module.exports = UserRoles;
  