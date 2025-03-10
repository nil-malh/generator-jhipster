/**
 * Copyright 2013-2023 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable no-new, no-unused-expressions */
import { before, it, describe, expect, expect as jestExpect } from 'esmocha';
import { expect } from 'chai';

import JDLRelationship from '../models/jdl-relationship.js';
import { relationshipTypes } from '../jhipster/index.js';
import JDLRelationships from '../models/jdl-relationships.js';

describe('jdl - JDLRelationships', () => {
  describe('add', () => {
    describe('when passing an invalid relationship', () => {
      describe('because it is nil', () => {
        it('should fail', () => {
          expect(() => {
            // @ts-expect-error
            new JDLRelationships().add();
          }).to.throw('A relationship must be passed so as to be added.');
        });
      });
    });
    describe('when passing a valid relationship', () => {
      let relationships;

      before(() => {
        relationships = new JDLRelationships();
        relationships.add(
          new JDLRelationship({
            from: 'Abc',
            to: 'Abc2',
            injectedFieldInFrom: 'something',
            type: relationshipTypes.ONE_TO_ONE,
          }),
        );
        relationships.add(
          new JDLRelationship({
            from: 'Abc2',
            to: 'Abc3',
            injectedFieldInFrom: 'somethingElse',
            type: relationshipTypes.ONE_TO_ONE,
          }),
        );
      });

      it('succeeds', () => {
        expect(relationships.size()).to.equal(2);
      });
    });
  });
  describe('get', () => {
    describe('when passing an invalid type', () => {
      it('should fail', () => {
        expect(() => {
          new JDLRelationships().get('oops', 42);
        }).to.throw("A valid relationship type must be passed so as to retrieve the relationship, got 'oops'.");
      });
    });
    describe('when passing an invalid id', () => {
      it('should fail', () => {
        expect(() => {
          // @ts-expect-error
          new JDLRelationships().get(relationshipTypes.ONE_TO_MANY);
        }).to.throw('A relationship id must be passed so as to retrieve the relationship.');
      });
    });
    describe('when passing valid arguments', () => {
      describe('but there is no relationship', () => {
        it('should return null', () => {
          expect(new JDLRelationships().get(relationshipTypes.ONE_TO_MANY, 42)).to.be.undefined;
        });
      });
      describe('for an existing relationship', () => {
        let relationships;
        let relationship;

        before(() => {
          relationships = new JDLRelationships();
          relationship = new JDLRelationship({
            from: 'Abc',
            to: 'Abc2',
            injectedFieldInFrom: 'something',
            type: relationshipTypes.ONE_TO_ONE,
          });
          relationships.add(relationship);
        });

        it('should return it', () => {
          expect(relationships.get(relationship.type, relationship.getId())).to.deep.equal(relationship);
        });
      });
    });
  });
  describe('getOneToOne', () => {
    describe('when passing an invalid id', () => {
      it('should fail', () => {
        expect(() => {
          // @ts-expect-error
          new JDLRelationships().getOneToOne();
        }).to.throw('A relationship id must be passed so as to retrieve the relationship.');
      });
    });
    describe('when passing valid arguments', () => {
      describe('but there is no relationship', () => {
        it('should return null', () => {
          expect(new JDLRelationships().getOneToOne(42)).to.be.undefined;
        });
      });
      describe('for an existing relationship', () => {
        let relationships;
        let relationship;

        before(() => {
          relationships = new JDLRelationships();
          relationship = new JDLRelationship({
            from: 'Abc',
            to: 'Abc2',
            injectedFieldInFrom: 'something',
            type: relationshipTypes.ONE_TO_ONE,
          });
          relationships.add(relationship);
        });

        it('should return it', () => {
          expect(relationships.getOneToOne(relationship.getId())).to.deep.equal(relationship);
        });
      });
    });
  });
  describe('getOneToMany', () => {
    describe('when passing an invalid id', () => {
      it('should fail', () => {
        expect(() => {
          // @ts-expect-error
          new JDLRelationships().getOneToMany();
        }).to.throw('A relationship id must be passed so as to retrieve the relationship.');
      });
    });
    describe('when passing valid arguments', () => {
      describe('but there is no relationship', () => {
        it('should return null', () => {
          expect(new JDLRelationships().getOneToMany(42)).to.be.undefined;
        });
      });
      describe('for an existing relationship', () => {
        let relationships;
        let relationship;

        before(() => {
          relationships = new JDLRelationships();
          relationship = new JDLRelationship({
            from: 'Abc',
            to: 'Abc2',
            injectedFieldInFrom: 'something',
            type: relationshipTypes.ONE_TO_MANY,
          });
          relationships.add(relationship);
        });

        it('should return it', () => {
          expect(relationships.getOneToMany(relationship.getId())).to.deep.equal(relationship);
        });
      });
    });
  });
  describe('getManyToOne', () => {
    describe('when passing an invalid id', () => {
      it('should fail', () => {
        expect(() => {
          // @ts-expect-error
          new JDLRelationships().getManyToOne();
        }).to.throw('A relationship id must be passed so as to retrieve the relationship.');
      });
    });
    describe('when passing valid arguments', () => {
      describe('but there is no relationship', () => {
        it('should return null', () => {
          expect(new JDLRelationships().getManyToOne(42)).to.be.undefined;
        });
      });
      describe('for an existing relationship', () => {
        let relationships;
        let relationship;

        before(() => {
          relationships = new JDLRelationships();
          relationship = new JDLRelationship({
            from: 'Abc',
            to: 'Abc2',
            injectedFieldInFrom: 'something',
            type: relationshipTypes.MANY_TO_ONE,
          });
          relationships.add(relationship);
        });

        it('should return it', () => {
          expect(relationships.getManyToOne(relationship.getId())).to.deep.equal(relationship);
        });
      });
    });
  });
  describe('getManyToMany', () => {
    describe('when passing an invalid id', () => {
      it('should fail', () => {
        expect(() => {
          // @ts-expect-error
          new JDLRelationships().getManyToMany();
        }).to.throw('A relationship id must be passed so as to retrieve the relationship.');
      });
    });
    describe('when passing valid arguments', () => {
      describe('but there is no relationship', () => {
        it('should return null', () => {
          expect(new JDLRelationships().getManyToMany(42)).to.be.undefined;
        });
      });
      describe('for an existing relationship', () => {
        let relationships;
        let relationship;

        before(() => {
          relationships = new JDLRelationships();
          relationship = new JDLRelationship({
            from: 'Abc',
            to: 'Abc2',
            injectedFieldInFrom: 'something',
            injectedFieldInTo: 'somethingElse',
            type: relationshipTypes.MANY_TO_MANY,
          });
          relationships.add(relationship);
        });

        it('should return it', () => {
          expect(relationships.getManyToMany(relationship.getId())).to.deep.equal(relationship);
        });
      });
    });
  });
  describe('toArray', () => {
    let relationships;
    let relationship1;
    let relationship2;
    let array: any[] = [];

    before(() => {
      relationships = new JDLRelationships();
      relationship1 = new JDLRelationship({
        from: 'Abc',
        to: 'Abc2',
        injectedFieldInFrom: 'something',
        type: relationshipTypes.ONE_TO_ONE,
      });
      relationship2 = new JDLRelationship({
        from: 'Abc2',
        to: 'Abc3',
        injectedFieldInFrom: 'somethingElse',
        type: relationshipTypes.ONE_TO_ONE,
      });
      relationships.add(relationship1);
      relationships.add(relationship2);
      array = relationships.toArray();
    });

    it('should return the list of each relationship', () => {
      expect(array).to.deep.eq([relationship1, relationship2]);
    });
  });
  describe('oneToOneQuantity', () => {
    describe('when there is no OtO relationship', () => {
      it('should return 0', () => {
        expect(new JDLRelationships().oneToOneQuantity()).to.equal(0);
      });
    });
    describe('when there are OtO relationships', () => {
      let relationships;

      before(() => {
        relationships = new JDLRelationships();
        relationships.add(
          new JDLRelationship({
            from: 'Abc',
            to: 'Abc2',
            injectedFieldInFrom: 'something',
            type: relationshipTypes.ONE_TO_ONE,
          }),
        );
      });

      it('should return the size', () => {
        expect(relationships.oneToOneQuantity()).to.equal(1);
      });
    });
  });
  describe('oneToManyQuantity', () => {
    describe('when there is no OtM relationship', () => {
      it('should return 0', () => {
        expect(new JDLRelationships().oneToManyQuantity()).to.equal(0);
      });
    });
    describe('when there are OtM relationships', () => {
      let relationships;

      before(() => {
        relationships = new JDLRelationships();
        relationships.add(
          new JDLRelationship({
            from: 'Abc',
            to: 'Abc2',
            injectedFieldInFrom: 'something',
            type: relationshipTypes.ONE_TO_MANY,
          }),
        );
      });

      it('should return the size', () => {
        expect(relationships.oneToManyQuantity()).to.equal(1);
      });
    });
  });
  describe('manyToOneQuantity', () => {
    describe('when there is no MtO relationship', () => {
      it('should return 0', () => {
        expect(new JDLRelationships().manyToOneQuantity()).to.equal(0);
      });
    });
    describe('when there are MtO relationships', () => {
      let relationships;

      before(() => {
        relationships = new JDLRelationships();
        relationships.add(
          new JDLRelationship({
            from: 'Abc',
            to: 'Abc2',
            injectedFieldInFrom: 'something',
            type: relationshipTypes.MANY_TO_ONE,
          }),
        );
      });

      it('should return the size', () => {
        expect(relationships.manyToOneQuantity()).to.equal(1);
      });
    });
  });
  describe('manyToManyQuantity', () => {
    describe('when there is no OtO relationship', () => {
      it('should return 0', () => {
        expect(new JDLRelationships().manyToManyQuantity()).to.equal(0);
      });
    });
    describe('when there are OtO relationships', () => {
      let relationships;

      before(() => {
        relationships = new JDLRelationships();
        relationships.add(
          new JDLRelationship({
            from: 'Abc',
            to: 'Abc2',
            injectedFieldInFrom: 'something',
            injectedFieldInTo: 'somethingElse',
            type: relationshipTypes.MANY_TO_MANY,
          }),
        );
      });

      it('should return the size', () => {
        expect(relationships.manyToManyQuantity()).to.equal(1);
      });
    });
  });
  describe('size', () => {
    let relationships;

    before(() => {
      relationships = new JDLRelationships();
    });

    it('should return the number of relationships', () => {
      expect(relationships.size()).to.equal(0);
      relationships.add(
        new JDLRelationship({
          from: 'Abc',
          to: 'Abc2',
          injectedFieldInFrom: 'something',
          type: relationshipTypes.ONE_TO_ONE,
        }),
      );
      expect(relationships.size()).to.equal(1);
    });
  });
  describe('forEach', () => {
    let jdlRelationships;

    before(() => {
      jdlRelationships = new JDLRelationships();
    });

    describe('when not passing a function', () => {
      it('should not fail', () => {
        jdlRelationships.forEach();
      });
    });
    describe('when passing a function', () => {
      const result: any[] = [];

      before(() => {
        jdlRelationships.add(
          new JDLRelationship({
            from: 'Abc',
            to: 'Abc2',
            injectedFieldInFrom: 'something',
            type: relationshipTypes.ONE_TO_MANY,
          }),
        );
        jdlRelationships.add(
          new JDLRelationship({
            from: 'Abc',
            to: 'Abc2',
            injectedFieldInFrom: 'something',
            type: relationshipTypes.ONE_TO_ONE,
          }),
        );
        jdlRelationships.forEach(jdlRelationship => {
          result.push({ from: jdlRelationship.from, to: jdlRelationship.to, type: jdlRelationship.type });
        });
      });

      it('should use each relationship', () => {
        jestExpect(result).toMatchInlineSnapshot(`
[
  {
    "from": "Abc",
    "to": "Abc2",
    "type": "OneToOne",
  },
  {
    "from": "Abc",
    "to": "Abc2",
    "type": "OneToMany",
  },
]
`);
      });
    });
  });
  describe('toString', () => {
    describe('when there is no relationship', () => {
      it('should return an emptry string', () => {
        expect(new JDLRelationships().toString()).to.equal('');
      });
    });
    describe('when having one relationship per type', () => {
      let relationships;
      let oneToOneRelationship;
      let oneToManyRelationship;

      before(() => {
        relationships = new JDLRelationships();
        oneToOneRelationship = new JDLRelationship({
          from: 'Abc',
          to: 'Abc2',
          injectedFieldInFrom: 'something',
          injectedFieldInTo: 'somethingElse',
          type: relationshipTypes.ONE_TO_ONE,
        });
        oneToManyRelationship = new JDLRelationship({
          from: 'Abc',
          to: 'Abc2',
          injectedFieldInFrom: 'something',
          injectedFieldInTo: 'somethingElse',
          type: relationshipTypes.ONE_TO_MANY,
        });
        relationships.add(oneToOneRelationship);
        relationships.add(oneToManyRelationship);
      });

      it('should use the standard string form', () => {
        expect(relationships.toString()).to.equal(`relationship ${oneToOneRelationship.type} {
  ${oneToOneRelationship.from}{${oneToOneRelationship.injectedFieldInFrom}} to ${oneToOneRelationship.to}{${oneToOneRelationship.injectedFieldInTo}}
}
relationship ${oneToManyRelationship.type} {
  ${oneToManyRelationship.from}{${oneToManyRelationship.injectedFieldInFrom}} to ${oneToManyRelationship.to}{${oneToManyRelationship.injectedFieldInTo}}
}`);
      });
    });
    describe('when having more than one relationship per type', () => {
      let relationships;
      let oneToOneRelationship1;
      let oneToOneRelationship2;

      before(() => {
        relationships = new JDLRelationships();
        oneToOneRelationship1 = new JDLRelationship({
          from: 'Abc',
          to: 'Abc2',
          injectedFieldInFrom: 'something',
          injectedFieldInTo: 'somethingElse',
          type: relationshipTypes.ONE_TO_ONE,
        });
        oneToOneRelationship2 = new JDLRelationship({
          from: 'Abc2',
          to: 'Abc3',
          injectedFieldInFrom: 'something',
          injectedFieldInTo: 'somethingElse',
          type: relationshipTypes.ONE_TO_ONE,
        });
        relationships.add(oneToOneRelationship1);
        relationships.add(oneToOneRelationship2);
      });

      it('should use the new string form', () => {
        expect(relationships.toString()).to.equal(`relationship ${oneToOneRelationship1.type} {
  ${oneToOneRelationship1.from}{${oneToOneRelationship1.injectedFieldInFrom}} to ${oneToOneRelationship1.to}{${oneToOneRelationship1.injectedFieldInTo}}
  ${oneToOneRelationship2.from}{${oneToOneRelationship2.injectedFieldInFrom}} to ${oneToOneRelationship2.to}{${oneToOneRelationship2.injectedFieldInTo}}
}`);
      });
    });
  });
});
