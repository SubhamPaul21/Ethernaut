const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("DeployInstanceModule", (m) => {
    const password = m.getParameter("password", "unlock");
    const instance = m.contract("Instance", [password]);
    return { instance };
});
