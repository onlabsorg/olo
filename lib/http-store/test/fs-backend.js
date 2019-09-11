
const FSBackend = require("../lib/fs-backend");
const Path = require("path");
const rimraf = require("rimraf");
const mkdirp = require("mkdirp");
const fs = require("fs");
const ROOT_PATH = `${__dirname}/fs-store`;


async function Backend (content) {
    const backend = new FSBackend(ROOT_PATH);
    
    // clear the store
    await new Promise((resolve, reject) => {
        rimraf(`${ROOT_PATH}`, (err) => {
            if (err) reject(err);
            else resolve();
        })
    });
    
    fs.mkdirSync(ROOT_PATH);
    
    // document creation routine
    const createDoc = (fullPath, content) => {
        const ppath = Path.parse(fullPath);
        if (!fs.existsSync(ppath.dir+"/")) {
            mkdirp.sync(ppath.dir+"/");
        }
        return new Promise((resolve, reject) => {
            fs.writeFile(fullPath+".olo", content, {encoding:'utf8'}, (err) => {
                if (err) reject(err);
                else resolve();
            });            
        });                        
    }
    
    // create all the listed documents
    for (let path in content) {
        let fullPath = `${ROOT_PATH}${path}`;
        await createDoc(fullPath, content[path]);
    }
    
    return backend;
}

const test = require("olojs/test/store");
test("FSBackend", Backend);





const expect = require("chai").expect;
const errors = require("olojs/lib/errors");

describe("FSBackend access control", () => {
    
    describe("read operation", () => {
        it("should throw `olojs.errors.ReadAccessDenied` if `allowRead(path, userId)` return false", async () => {
            const backend = new FSBackend(ROOT_PATH);
            backend.allowRead = (path, userId) => false;
            
            var error = null;
            try {
                await backend.read("/path/to/doc1");
            } catch (e) {
                error = e;
            }
            expect(error).to.be.instanceof(errors.ReadAccessDenied);
            expect(error.message).to.equal("Read access denied on path '/path/to/doc1'");

            var error = null;
            try {
                await backend.read("/path/to/container1/");
            } catch (e) {
                error = e;
            }
            expect(error).to.be.instanceof(errors.ReadAccessDenied);
            expect(error.message).to.equal("Read access denied on path '/path/to/container1/'");
        });
    });

    describe("write operation", () => {
        it("should throw `olojs.errors.ReadAccessDenied` if `allowRead(path, userId)` return false", async () => {
            const backend = new FSBackend(ROOT_PATH);
            backend.allowWrite = (path, userId) => false;
            
            var error = null;
            try {
                await backend.write("/path/to/doc1", "new doc1 content");
            } catch (e) {
                error = e;
            }
            expect(error).to.be.instanceof(errors.WriteAccessDenied);
            expect(error.message).to.equal("Write access denied on path '/path/to/doc1'");
        });
    });

    describe("delete operation", () => {
        it("should throw `olojs.errors.ReadAccessDenied` if `allowRead(path, userId)` return false", async () => {
            const backend = new FSBackend(ROOT_PATH);
            backend.allowWrite = (path, userId) => false;
            
            var error = null;
            try {
                await backend.delete("/path/to/doc1");
            } catch (e) {
                error = e;
            }
            expect(error).to.be.instanceof(errors.WriteAccessDenied);
            expect(error.message).to.equal("Write access denied on path '/path/to/doc1'");

            var error = null;
            try {
                await backend.delete("/path/to/container1/");
            } catch (e) {
                error = e;
            }
            expect(error).to.be.instanceof(errors.WriteAccessDenied);
            expect(error.message).to.equal("Write access denied on path '/path/to/container1/'");
        });
    });
});
