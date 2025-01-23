export const Clients_API = {
  client: {
    get:'Client/GetActiveList', //'Client/GetList',
    getById: 'Client/GetById',
    create: 'Client/Create',
    update: 'Client/Update',
    getOrNewClientCode:"Client/GetClientCodeorNewClient",
    createIntake: '/CreateClientIntake',
    activationClient:'Client/Activation'
  }
};
