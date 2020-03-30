const expect = require("chai").expect;
const Document = require("../lib/olojs-backend-environment").Document;
const errors = require("../lib/errors");


module.exports = function test (Store, readOnly=false) {    
    var store;
    
    before(async () => {
        store = await Store({
            "/path/to/doc1"             : "doc1 source",
            "/path/to/doc2"             : "doc2 source",
            "/path/to/doc3"             : "doc3 source",
            "/path/to/container1/doc4"  : "doc4 source",
            "/path/to/container2/doc5"  : "doc5 source",
            "/path/TO/doc6"             : "doc6 source",
            "/a/b/c/doc7"               : "doc7 source"
        });
    });
    
    describe(`Store.prototype.read(documentPath)`, () => {
        
        it("should return the document stored at the given path", async () => {
            var doc = await store.read("path/to/doc1");
            expect(doc).to.equal("doc1 source");

            var doc = await store.read("/path/to/doc2");
            expect(doc).to.be.equal("doc2 source");
        });

        it("should return an empty string if the path doesn't exist", async () => {
            var doc = await store.read("/path/to/doc111");
            expect(doc).to.equal("");            
        });
    });        

    describe(`Store.prototype.read(containerPath) - async method`, () => {

        it("should return a document defining the child 'items' list of the container", async () => {
            var source = await store.read("/path/to/");
            var doc = new Document(source);
            var content = await doc.evaluate();
            var docNS = await content.namespace;

            expect(docNS.items).to.be.an("array");
            expect(docNS.items.sort()).to.deep.equal([
                "container1/doc4",
                "container2/doc5",
                "doc1",
                "doc2",
                "doc3",
            ]);
        });

        it("should work as well with root path `/`", async () => {
            var source = await store.read("/");
            var doc = new Document(source);
            var content = await doc.evaluate();
            var docNS = await content.namespace;
            
            expect(docNS.items).to.be.an("array");
            expect(docNS.items.sort()).to.deep.equal([
                "a/b/c/doc7",
                "path/TO/doc6",
                "path/to/container1/doc4",
                "path/to/container2/doc5",
                "path/to/doc1",
                "path/to/doc2",
                "path/to/doc3",
            ]);
        });

        it("should return a document empty 'items' lists if the path doesn't exist", async () => {
            var source = await store.read("/path/to/non-existing/container/");
            var doc = new Document(source);
            var content = await doc.evaluate();
            var docNS = await content.namespace;
            
            expect(docNS.items).to.be.an("array");
            expect(docNS.items.sort()).to.deep.equal([]);
        });            
    });

    describe(`Store.prototype.write(documentPath, source) - async method`, () => {
        
        it("should map the passed document source to the passed path", async () => {
            var docSource = "doc11 source";
            await store.write("/path/to/doc11", docSource);
            var source = await store.read("/path/to/doc11");
            expect(source).to.equal(docSource);
            
            var containerDoc = new Document(await store.read("/path/to/"));
            var docNS = (await containerDoc.evaluate()).namespace;    
            expect(docNS.items.sort()).to.deep.equal([
                "container1/doc4",
                "container2/doc5",
                "doc1",
                "doc11",
                "doc2",
                "doc3",
            ]);
        });
        
        it("should create the intermediate containers if they don't exist", async () => {
            var docSource = "doc12 source";
            await store.write("/path/to/container3/container4/doc12", docSource);
            var source = await store.read("/path/to/container3/container4/doc12");
            expect(source).to.equal(docSource);
            
            var containerDoc = new Document(await store.read("/path/to/"));
            var docNS = (await containerDoc.evaluate()).namespace;    
            expect(docNS.items.sort()).to.deep.equal([
                "container1/doc4",
                "container2/doc5",
                "container3/container4/doc12",
                "doc1",
                "doc11",
                "doc2",
                "doc3",
            ]);
        });
    });

    describe(`Store.prototype.write(containerPath, source) - async method`, () => {
        
        it("should throw a WriteOperationNotAllowed", async () => {
            try {
                await store.write("/path/to/container1/", {
                    'doc41': "doc41 source",
                    'container5/doc51': "doc51 source"
                });
                throw new Error("It didn't throw.")
            } catch (error) {
                expect(error).to.be.instanceof(errors.WriteOperationNotAllowed);
            }
        });
    });
    
    describe(`Store.prototype.delete(documentPath) - async method`, () => {

        it("should remove the document at the given path", async () => {    
            var docSource = await store.read("/path/to/doc11");
            expect(docSource).to.equal("doc11 source");
            
            await store.delete("path/to/doc11");
            var docSource = await store.read("/path/to/doc11");
            expect(docSource).to.equal("");
            
            var containerDoc = new Document(await store.read("/path/to/"));
            var docNS = (await containerDoc.evaluate()).namespace;    
            expect(docNS.items.sort()).to.deep.equal([
                "container1/doc4",
                "container2/doc5",
                "container3/container4/doc12",
                "doc1",
                "doc2",
                "doc3",
            ]);                
        });

        it("should fail silentrly if the document doesn't exist", async () => {
            var docSource = await store.read("/path/to/doc11");
            expect(docSource).to.equal("");
            
            await store.delete("path/to/doc11");
            var docSource = await store.read("/path/to/doc11");
            expect(docSource).to.equal("");
            
            var containerDoc = new Document(await store.read("/path/to/"));
            var docNS = (await containerDoc.evaluate()).namespace;    
            expect(docNS.items.sort()).to.deep.equal([
                "container1/doc4",
                "container2/doc5",
                "container3/container4/doc12",
                "doc1",
                "doc2",
                "doc3",
            ]);                
        });            

        it("should remove also the container if it become empty", async () => {    
            var docSource = await store.read("/path/to/container3/container4/doc12");
            expect(docSource).to.equal("doc12 source");
            
            await store.delete("/path/to/container3/container4/doc12");
            var docSource = await store.read("/path/to/container3/container4/doc12");
            expect(docSource).to.equal("");
            
            var containerDoc = new Document(await store.read("/path/to/"));
            var docNS = (await containerDoc.evaluate()).namespace;    
            expect(docNS.items.sort()).to.deep.equal([
                "container1/doc4",
                "container2/doc5",
                "doc1",
                "doc2",
                "doc3",
            ]);                
        });
    });
    
    describe(`Store.prototype.delete(containerPath) - async method`, () => {
        
        it("should remove the given container and its content", async () => {
            await store.write("/path/to/container1/doc41", "doc41 source");
            await store.write("/path/to/container1/doc42", "doc42 source");
            
            // verify current situation
            var containerDoc = new Document(await store.read("/path/to/"));
            var docNS = (await containerDoc.evaluate()).namespace;    
            expect(docNS.items.sort()).to.deep.equal([
                "container1/doc4",
                "container1/doc41",
                "container1/doc42",
                "container2/doc5",
                "doc1",
                "doc2",
                "doc3",
            ]);                

            // delete container1
            await store.delete("/path/to/container1/");

            var containerDoc = new Document(await store.read("/path/to/"));
            var docNS = (await containerDoc.evaluate()).namespace;    
            expect(docNS.items.sort()).to.deep.equal([
                "container2/doc5",
                "doc1",
                "doc2",
                "doc3",
            ]);                
        });

        it("should fail silently if the the given path doesn't exist", async () => {
            
            // verify current situation
            var containerDoc = new Document(await store.read("/path/to/"));
            var docNS = (await containerDoc.evaluate()).namespace;    
            expect(docNS.items.sort()).to.deep.equal([
                "container2/doc5",
                "doc1",
                "doc2",
                "doc3",
            ]);                

            // delete container1
            await store.delete("/path/to/container1/");

            var containerDoc = new Document(await store.read("/path/to/"));
            var docNS = (await containerDoc.evaluate()).namespace;    
            expect(docNS.items.sort()).to.deep.equal([
                "container2/doc5",
                "doc1",
                "doc2",
                "doc3",
            ]);                
        });
    });
}
