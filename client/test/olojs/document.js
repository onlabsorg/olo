
const expect = require("chai").expect;
const Path = require("../../lib/olojs/path");
const Value = require("../../lib/olojs/value");
const Change = require("../../lib/olojs/change");
const Document = require("../../lib/olojs/document");
const errors = require("../../lib/olojs/errors");

suite("olojs.Document", () => {

    test("new Document(docHash, role)", () => {
        expect(() => new Document()).to.not.throw(errors.ReadPermissionError);
    });

    test("Document.prototype.ownerName - getter", () => {
        var doc = new Document({owner:"xxx"});
        expect(doc.ownerName).to.equal("xxx");

        var doc = new Document({owner:"yyy"});
        expect(doc.ownerName).to.equal("yyy");
    });

    test("Document.prototype.userName - getter", () => {
        var doc = new Document({}, "xxx");
        expect(doc.userName).to.equal("xxx");

        var doc = new Document({}, "yyy");
        expect(doc.userName).to.equal("yyy");
    });

    test("Document.prototype.userRole - getter", () => {
        const docHash = {
            committed: {
                users: {
                    Owner: {role:"owner"},
                    Admin: {role:"admin"},
                    Writer: {role:"writer"},
                    Reader: {role:"reader"},
                    Guest: {role:"none"}
                }
            }
        }

        var doc = new Document(docHash);
        expect(doc.userRole).to.equal("owner");

        doc = new Document(docHash, 'Owner');
        expect(doc.userRole).to.equal("owner");

        doc = new Document(docHash, 'Admin');
        expect(doc.userRole).to.equal("admin");

        doc = new Document(docHash, 'Writer');
        expect(doc.userRole).to.equal("writer");

        doc = new Document(docHash, 'Reader');
        expect(doc.userRole).to.equal("reader");
    });

    test("Document.prototype.get(path)", () => {
        const docHash = {
            committed: {
                users: {
                    Owner: {role:"owner"},
                    Admin: {role:"admin"},
                    Writer: {role:"writer"},
                    Reader: {role:"reader"},
                    Guest: {role:"none"}
                },
                data: {
                    n: null,
                    o: {x:10},
                    s: "abc"
                }
            }
        }

        var doc = new Document(docHash);
        expect(doc.get('/data/n')).to.equal(null);
        expect(doc.get('/data/o')).to.deep.equal({x:10});
        expect(doc.get('/data/s')).to.equal("abc");

        doc = new Document(docHash, 'Guest');
        expect(() => doc.get("/users")).to.throw(errors.ReadPermissionError);
        expect(() => doc.get("/data/n")).to.throw(errors.ReadPermissionError);

        doc = new Document(docHash, 'Reader');
        expect(() => doc.get("/users")).to.not.throw(errors.ReadPermissionError);
        expect(() => doc.get("/data/n")).to.not.throw(errors.ReadPermissionError);

        doc = new Document(docHash, 'Writer');
        expect(() => doc.get("/users")).to.not.throw(errors.ReadPermissionError);
        expect(() => doc.get("/data/n")).to.not.throw(errors.ReadPermissionError);

        doc = new Document(docHash, 'Admin');
        expect(() => doc.get("/users")).to.not.throw(errors.ReadPermissionError);
        expect(() => doc.get("/data/n")).to.not.throw(errors.ReadPermissionError);

        doc = new Document(docHash, 'Owner');
        expect(() => doc.get("/users")).to.not.throw(errors.ReadPermissionError);
        expect(() => doc.get("/data/n")).to.not.throw(errors.ReadPermissionError);
    });

    test("Document.prototype.type(path)", () => {
        const docHash = {
            committed: {
                users: {
                    Owner: {role:"owner"},
                    Admin: {role:"admin"},
                    Writer: {role:"writer"},
                    Reader: {role:"reader"},
                    Guest: {role:"none"}
                },
                data: {
                    n: null,
                    o: {x:10},
                    s: "abc"
                }
            }
        }

        var doc = new Document(docHash);
        expect(doc.type('/data/n')).to.equal('Null');
        expect(doc.type('/data/o')).to.equal('Object');
        expect(doc.type('/data/s')).to.equal('String');

        doc = new Document(docHash, 'none');
        expect(() => doc.type("/users")).to.throw(errors.ReadPermissionError);
        expect(() => doc.type("/data/n")).to.throw(errors.ReadPermissionError);

        doc = new Document(docHash, 'Reader');
        expect(() => doc.type("/users")).to.not.throw(errors.ReadPermissionError);
        expect(() => doc.type("/data/n")).to.not.throw(errors.ReadPermissionError);

        doc = new Document(docHash, 'Writer');
        expect(() => doc.type("/users")).to.not.throw(errors.ReadPermissionError);
        expect(() => doc.type("/data/n")).to.not.throw(errors.ReadPermissionError);

        doc = new Document(docHash, 'Admin');
        expect(() => doc.type("/users")).to.not.throw(errors.ReadPermissionError);
        expect(() => doc.type("/data/n")).to.not.throw(errors.ReadPermissionError);

        doc = new Document(docHash, 'Owner');
        expect(() => doc.type("/users")).to.not.throw(errors.ReadPermissionError);
        expect(() => doc.type("/data/n")).to.not.throw(errors.ReadPermissionError);
    });

    test("Document.prototype.applyChanges(...changes)", () => {
        var doc = new Document({
            committed: {
                data:{}
            }
        });
        doc.applyChanges(new Change("/data/x", 10), new Change("/data/y", 20));
        expect(doc.get("/data")).to.deep.equal({x:10, y:20});

        doc.applyChanges(new Change("/data/y", undefined), new Change("/data/z", 30));
        expect(doc.get("/data")).to.deep.equal({x:10, z:30});

        doc.applyChanges(new Change("/data/o/x", 10, 2000));
        expect(doc.get("/data")).to.deep.equal({x:10, z:30});

        doc.applyChanges(new Change("/data/o", {}, 1000));
        expect(doc.get("/data")).to.deep.equal({x:10, z:30, o:{x:10}});

        const docHash = {
            committed: {
                users: {
                    Owner: {role:"owner"},
                    Admin: {role:"admin"},
                    Writer: {role:"writer"},
                    Reader: {role:"reader"},
                    Guest: {role:"none"}
                },
                data: {}
            }
        }

        doc = new Document(docHash, 'Reader');
        expect(() => doc.applyChanges(new Change("/x", 10))).to.throw(errors.UpdatePermissionError);
        expect(() => doc.applyChanges(new Change("/data/x", 10))).to.throw(errors.UpdatePermissionError);
        expect(doc.get('/data/x')).to.be.undefined;
        expect(doc.get('/x')).to.be.undefined;

        doc = new Document(docHash, 'Writer');
        expect(() => doc.applyChanges(new Change("/data/x", 10), new Change("/data/y", 20))).to.not.throw(errors.UpdatePermissionError);
        expect(() => doc.applyChanges(new Change("/data/y", 20), new Change("/x", 10))).to.throw(errors.UpdatePermissionError);
        expect(doc.get('/data')).to.deep.equal({x:10, y:20});
        expect(doc.get('/x')).to.be.undefined;

        doc = new Document(docHash, 'Admin');
        expect(() => doc.applyChanges(new Change("/data/x", 10), new Change("/data/y", 20))).to.not.throw(errors.UpdatePermissionError);
        expect(() => doc.applyChanges(new Change("/data/z", 30), new Change("/x", 10))).to.not.throw(errors.UpdatePermissionError);
        expect(doc.get('/data')).to.deep.equal({x:10, y:20, z:30});
        expect(doc.get('/x')).to.equal(10);

        doc = new Document(docHash, 'Owner');
        expect(() => doc.applyChanges(new Change("/data/x", 10), new Change("/data/y", 20))).to.not.throw(errors.UpdatePermissionError);
        expect(() => doc.applyChanges(new Change("/data/z", 30), new Change("/x", 10))).to.not.throw(errors.UpdatePermissionError);
        expect(doc.get('/data')).to.deep.equal({x:10, y:20, z:30});
        expect(doc.get('/x')).to.equal(10);
    });

    test("Document.prototype.set(path, value)", () => {
        const doc = new Document({
            committed: {
                data: {}
            }
        });
        doc.set('/data/x', 10);
        expect(doc.get('/data')).to.deep.equal({x:10});
    });

    test("Document.prototype.delete(path)", () => {
        const doc = new Document({
            committed: {
                data: {}
            }
        });
        doc.set('/data/x', 10);
        doc.set('/data/y', 20);
        doc.delete('/data/x');
        expect(doc.get('/data')).to.deep.equal({y:20});
    });

    test("Document.prototype.version - getter", () => {
        const doc = new Document({release:"1.2.3"});
        expect(doc.version).to.equal("1.2.3-pre.0");

        doc.set('/data/x', 10);
        doc.set('/data/y', 20);
        expect(doc.version).to.equal("1.2.3-pre.2");

        doc.delete('/data/y');
        expect(doc.version).to.equal("1.2.3-pre.3");
    });

    test("Document.prototype.commit(releaseType)", () => {
        var doc = new Document({
            committed: {
                data: {}
            },
            release:"0.0.0"
        });
        doc.set("/data/x", 10);
        doc.set("/data/y", 20);
        expect(doc.get('/data')).to.deep.equal({x:10, y:20});
        expect(doc.version).to.equal("0.0.0-pre.2");

        doc.commit("patch");
        expect(doc.get('/data')).to.deep.equal({x:10, y:20});
        expect(doc.version).to.equal("0.0.1-pre.0");

        doc.set("/data/z", 30);
        expect(doc.version).to.equal("0.0.1-pre.1");
        doc.commit("minor");
        expect(doc.get('/data')).to.deep.equal({x:10, y:20, z:30});
        expect(doc.version).to.equal("0.1.0-pre.0");

        doc.set("/data/w", 0);
        expect(doc.version).to.equal("0.1.0-pre.1");
        doc.commit("major");
        expect(doc.get('/data')).to.deep.equal({x:10, y:20, z:30, w:0});
        expect(doc.version).to.equal("1.0.0-pre.0");

        doc.set("/data/v", 1);
        expect(doc.version).to.equal("1.0.0-pre.1");
        doc.commit("xxx");
        expect(doc.version).to.equal("1.0.0-pre.1");

        const docHash = {
            committed: {
                users: {
                    Owner: {role:"owner"},
                    Admin: {role:"admin"},
                    Writer: {role:"writer"},
                    Reader: {role:"reader"},
                    Guest: {role:"none"}
                },
                data: {}
            }
        }

        doc = new Document(docHash, 'none');
        expect(() => doc.commit('minor')).to.throw(errors.WritePermissionError);

        doc = new Document(docHash, 'Reader');
        expect(() => doc.commit('minor')).to.throw(errors.WritePermissionError);

        doc = new Document(docHash, 'Writer');
        expect(() => doc.commit('minor')).to.throw(errors.WritePermissionError);

        doc = new Document(docHash, 'Admin');
        expect(() => doc.commit('minor')).to.throw(errors.WritePermissionError);

        doc = new Document(docHash, 'Owner');
        expect(() => doc.commit('minor')).to.not.throw(errors.WritePermissionError);
    });

    test("Document.prototype.delta(version)", () => {
        var doc = new Document();

        const change1 = new Change('/data/x', 10);
        const change2 = new Change('/data/y', 20);
        const change3 = new Change('/data/z', 30);

        doc.applyChanges(change1);
        doc.commit('minor');
        const oldVersion = doc.version;

        doc.applyChanges(change2, change3);
        const delta = doc.delta(oldVersion);

        expect(delta).to.deep.equal([change2, change3]);
    });

    test("Document.prototype.toHash()", () => {
        const docHash = {
            committed: {
                head: {
                    users: {
                        user1: {
                            role: "admin",
                            email: "user1@onlabs.org"
                        },
                        user2: {
                            role: "reader",
                            email: "user2@onlabs.org"
                        },
                        user3: {
                            role: "reader",
                            email: "user3@onlabs.org"
                        }
                    }
                },
                body: {
                    n: null,
                    o: {x:10},
                    s: "abc"
                }
            },
            owner: "me",
            release: "1.0.0",
            changes: []
        }

        const doc = new Document(docHash);
        expect(doc.toHash()).to.deep.equal(docHash);
        expect(doc.toHash()).to.not.equal(docHash);
    });

    test("Document change events", () => {
        const doc = new Document({
            committed: {
                users: {
                    user1: {
                        role: "admin",
                        email: "user1@onlabs.org"
                    },
                    user2: {
                        role: "reader",
                        email: "user2@onlabs.org"
                    },
                    user3: {
                        role: "reader",
                        email: "user3@onlabs.org"
                    }
                },
                data: {}
            },
        });

        var changes = null;
        function changeCallback (passedChanges) {
            changes = passedChanges.map(change => {return {path:String(change.path), value:change.value}})
        }
        doc.changeCallbacks.add(changeCallback);

        const ch1 = new Change('/data/x', 11, 1000);
        const ch2 = new Change('/data/y', 20, 3000);
        const ch3 = new Change('/data/o', {}, 4000);
        const ch4 = new Change('/data/o/x', 10, 5000);

        doc.applyChanges(ch1, ch2);

        expect(changes).to.deep.equal([
            {path:'/data/x', value:11},
            {path:'/data/y', value:20},
        ]);

        changes = null;
        doc.applyChanges(ch4);
        expect(changes).to.be.null;

        doc.applyChanges(ch3);
        expect(changes).to.deep.equal([
            {path:'/data/o', value:{x:10}},
        ]);

        doc.changeCallbacks.delete(changeCallback);
        changes = null;
        doc.applyChanges(new Change('/data/o/z', 30, 10000));
        expect(changes).to.be.null;
    });
});