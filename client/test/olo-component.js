
const model = require("model");
const Document = require("olojs/document");

const OloComponent = require("olo-component");



suite("<olo-component>", () => {
    const testFrame = document.querySelector("#test-frame");

    suite("child components", () => {

        test("should register the child components when attached", (done) => {
            testFrame.innerHTML = `
                <olo-component id="root">
                    <olo-component id="child-1"></olo-component>
                    <olo-component id="child-2">
                        <olo-component id="child-2-1"></olo-component>
                    </olo-component>
                    <olo-component id="child-3"></olo-component>
                </olo-component>
            `;

            window.setTimeout(function () {
                var root = testFrame.querySelector("#root");
                var child1 = root.querySelector("#child-1");
                var child2 = root.querySelector("#child-2");
                var child3 = root.querySelector("#child-3");

                expect(Array.from(root.childComponents)).to.deep.equal([child1, child2, child3]);

                expect(child1.parentComponent).to.equal(root);
                expect(child2.parentComponent).to.equal(root);
                expect(child3.parentComponent).to.equal(root);

                var child21 = child2.querySelector("#child-2-1");
                expect(Array.from(child2.childComponents)).to.deep.equal([child21]);
                expect(child21.parentComponent).to.equal(child2);

                done();
            }, 10);
        });

        test("should unregister the child components when removed", function (done) {
            testFrame.innerHTML = `
                <olo-component id="root">
                    <olo-component id="child-1"></olo-component>
                    <olo-component id="child-2"></olo-component>
                    <olo-component id="child-3"></olo-component>
                </olo-component>
            `;

            window.setTimeout(function () {
                var root = testFrame.querySelector("#root");
                var child1 = root.querySelector("#child-1");
                var child2 = root.querySelector("#child-2");
                var child3 = root.querySelector("#child-3");

                expect(Array.from(root.childComponents)).to.deep.equal([child1, child2, child3]);
                expect(child1.parentComponent).to.equal(root);
                expect(child2.parentComponent).to.equal(root);
                expect(child3.parentComponent).to.equal(root);

                root.removeChild(child2);
                window.setTimeout(function () {
                    expect(Array.from(root.childComponents)).to.deep.equal([child1, child3]);
                    expect(child2.parentComponent).to.be.null;

                    done();
                }, 10);
            }, 10);
        });
    });

    suite("model binding", () => {

        test("binding to absolute path", () => {
            const doc = new Document();
            doc.set('data', {
                child1: {grandchild1: 11},
                child2: {grandchild2: 22}
            });
            model.setDocument(doc);

            testFrame.innerHTML = '<olo-component model="/child1/grandchild1"></olo-componnt>';

            const component = testFrame.querySelector("olo-component");
            expect(component.model).to.equal(11);

            component.setAttribute("model", "/child2/grandchild2");
            expect(component.model).to.equal(22);

            component.setAttribute("model", "/child2/grandchild3");
            expect(component.model).to.be.undefined;
        });

        test("binding to relative path", () => {
            const dataHash = {
                c0: {
                    gc0: {
                        ggc0: "c000",
                        ggc1: "c001"
                    },
                    gc1: {
                        ggc0: "c010",
                        ggc1: "c011"
                    },
                },
                c1: {
                    gc0: {
                        ggc0: "c100",
                        ggc1: "c101"
                    },
                    gc1: {
                        ggc0: "c110",
                        ggc1: "c111"
                    },
                }
            };
            const doc = new Document();
            doc.set('data', dataHash);
            model.setDocument(doc);

            testFrame.innerHTML = `
                <olo-component id="cmp1">
                    <olo-component id="cmp2">
                        <olo-component id="cmp3">
                        </olo-component>
                    </olo-component>
                </olo-component>
            `;

            const cmp1 = testFrame.querySelector("#cmp1");
            const cmp2 = testFrame.querySelector("#cmp2");
            const cmp3 = testFrame.querySelector("#cmp3");

            cmp1.setAttribute("model", '/c0');
            cmp2.setAttribute("model", './gc0/ggc0');
            cmp3.setAttribute("model", '../ggc1');
            expect(cmp1.model).to.deep.equal(dataHash.c0);
            expect(cmp2.model).to.equal('c000');
            expect(cmp3.model).to.equal('c001');

            cmp1.setAttribute("model", "/c1");
            expect(cmp1.model).to.deep.equal(dataHash.c1);
            expect(cmp2.model).to.equal('c100');
            expect(cmp3.model).to.equal('c101');
        });
    });

    suite("model changes", () => {
        var doc, docDataHash, cmp1, cmp2, cmp1_callsCount, cmp2_callsCount;

        setup(() => {
            docDataHash = {
                c0: {
                    gc0: "c00",
                    gc1: "c01",
                    gc2: "c02"
                },
                c1: {
                    gc0: "c10",
                    gc1: "c11",
                    gc2: "c12"
                }
            }
            doc = new Document();
            doc.set('data', docDataHash);
            model.setDocument(doc);

            testFrame.innerHTML = `
                <olo-component id="cmp1" model="/c0">
                    <olo-component id="cmp2" model="./gc0">
                    </olo-component>
                </olo-component>
            `;

            cmp1 = testFrame.querySelector("#cmp1");
            cmp1.updateView = () => {cmp1_callsCount += 1};

            cmp2 = testFrame.querySelector("#cmp2");
            cmp2.updateView = () => {cmp2_callsCount += 1};
        });

        test("should call .updateView when a new model is bound", () => {
            cmp1_callsCount = cmp2_callsCount = 0;
            cmp1.setAttribute("model", "/c1");
            expect(cmp1_callsCount).to.equal(1);
            expect(cmp2_callsCount).to.equal(1);

            cmp1_callsCount = cmp2_callsCount = 0;
            cmp2.setAttribute("model", "./gc1");
            expect(cmp1_callsCount).to.equal(0);
            expect(cmp2_callsCount).to.equal(1);
        });

        test("should call .updateView on model changes", () => {
            cmp1.setAttribute("model", "/c0");
            cmp2.setAttribute("model", "./gc0");

            cmp1_callsCount = cmp2_callsCount = 0;
            doc.set('/data/c0/x', 10)
            expect(cmp1_callsCount).to.equal(1);
            expect(cmp2_callsCount).to.equal(0);

            cmp1_callsCount = cmp2_callsCount = 0;
            doc.set('/data/c0/gc0', doc.get('/data/c0/gc0') + "-modif");
            expect(cmp1_callsCount).to.equal(1);
            expect(cmp2_callsCount).to.equal(1);

            //detaches change listener when unbinding a model
            cmp2.setAttribute("model", "./gc1");
            cmp1_callsCount = cmp2_callsCount = 0;
            doc.set('/data/c0/gc0', doc.get('/data/c0/gc0') + "-modif");
            expect(cmp1_callsCount).to.equal(1);
            expect(cmp2_callsCount).to.equal(0);
        });

        test("should call .updateView on document change", () => {
            cmp1.setAttribute("model", "/c0");
            cmp2.setAttribute("model", "./gc0");

            cmp1_callsCount = cmp2_callsCount = 0;
            const newDoc = new Document();
            model.setDocument(newDoc);
            expect(cmp1_callsCount).to.equal(1);
            expect(cmp2_callsCount).to.equal(1);
        });

        test("should not call .updateView once removed from the DOM", () => {
            cmp1.setAttribute("model", "/c0");
            cmp2.setAttribute("model", "./gc0");

            cmp1.removeChild(cmp2);

            cmp1_callsCount = cmp2_callsCount = 0;
            const newDoc = new Document();
            newDoc.set('data', docDataHash);
            model.setDocument(newDoc);
            expect(cmp1_callsCount).to.equal(1);
            expect(cmp2_callsCount).to.equal(0);

            cmp1_callsCount = cmp2_callsCount = 0;
            newDoc.set('/data/c0/gc0', newDoc.get('/data/c0/gc0') + "-modif");
            expect(cmp1_callsCount).to.equal(1);
            expect(cmp2_callsCount).to.equal(0);
        });
    });
});
