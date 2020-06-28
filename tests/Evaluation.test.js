const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const factory = require("../src/factory/evaluation");
const db = require("../src/repository/evaluations");
describe("Prospects Tests", () => {
  let mongoServer, prospectCode, code;

  let evaluationMock = {
    userCode: "mockUser",
    summary: "Mock Summary",
    bestSkills: ["Mock Bests Skills"],
    worstSkills: ["Mock Worst Skills"],
    overall: 8,
    hasRedFlag: false,
  };

  beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri, {}, (err) => {
      if (err) {
        throw err;
      }
    });

    const prospectRepository = require("../src/repository/prospects");
    const prospectFactory = require("../src/factory/prospect");

    let prospectMock = {
      position: "qb",
      name: "Russel Wilson",
      college: "Wisconsin",
      year: 2011,
    };

    const result = await prospectRepository.create(
      prospectFactory(prospectMock)
    );
    prospectCode = result.code;

    Object.assign(evaluationMock, { prospectCode });
  });

  it("Factory should return a code and a prospect ", async () => {
    const mock = await factory(evaluationMock);
    expect(mock.code).toBeDefined();
    expect(mock._prospect).toBeDefined();
  });

  it("Should be possible to create a evaluation ", async () => {
    const mock = await factory(evaluationMock);
    code = mock.code;
    
    let response = await db.create(mock);
    expect(response._id).toBeDefined();
    expect(response.code).toBeDefined();
    expect(response.overall).toBe(mock.overall);
    
    Object.assign(evaluationMock, { code })
  });

  it("Should be able to list all evaluations ", async () => {
    let response = await db.find();
    expect(Array.isArray(response)).toBeTruthy();
  });

  it("Should be able to list evaluations by prospect ", async () => {
    let response = await db.findByProspect(prospectCode);
    expect(Array.isArray(response)).toBeTruthy();
    expect(response.length).toBeGreaterThan(0);
  });

  it("Should be able to edit a evaluation ", async () => {
    const mock = await factory(evaluationMock);
    let overall = 10;
    Object.assign(mock, { overall });

    let response = await db.update(mock, code);
    expect(response.ok).toBe(1);
    expect(response.nModified).toBe(1);
  });

  it("Should fail to create when missing required field", async () => {
    const mock = await factory(evaluationMock);

    Object.assign(mock, { prospectCode: null });
    let promise = db.create(mock);
    expect(Promise.resolve(promise)).rejects.toThrow();
  });

  it("Should be able to remove ", async () => {
    let result = await db.remove(code);

    expect(result).toHaveProperty("deletedCount");
    expect(result.deletedCount).toEqual(1);
  });
});
