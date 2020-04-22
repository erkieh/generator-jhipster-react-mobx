/*
 * Copyright 2020 Erki Ehtla.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const constants = require('generator-jhipster/generators/generator-constants');
const expectedFiles = require('../utils/expected-files');
const ClientGenerator = require('../../generators/client');

const REACT = constants.SUPPORTED_CLIENT_FRAMEWORKS.REACT;

const mockBlueprintSubGen = class extends ClientGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important
        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);
        if (!jhContext) {
            this.error("This is a JHipster blueprint and should be used only like 'jhipster --blueprints myblueprint')}");
        }
        this.configOptions = jhContext.configOptions || {};
        // This sets up options for this sub generator and is being reused from JHipster
        jhContext.setupClientOptions(this, jhContext);
    }

    get initializing() {
        return super._initializing();
    }

    get prompting() {
        return super._prompting();
    }

    get configuring() {
        return super._configuring();
    }

    get default() {
        return super._default();
    }

    get writing() {
        const phaseFromJHipster = super.writing;
        const customPhaseSteps = {
            addDummyProperty() {
                this.addNpmDependency('dummy-blueprint-property', '2.0');
            }
        };
        return { ...phaseFromJHipster, ...customPhaseSteps };
    }

    get install() {
        return super._install();
    }

    get end() {
        return super._end();
    }
};

describe('JHipster client generator with blueprint', () => {
    const blueprintNames = ['generator-jhipster-myblueprint', 'myblueprint'];

    blueprintNames.forEach(blueprintName => {
        describe(`generate client with blueprint option '${blueprintName}'`, () => {
            before(done => {
                helpers
                    .run('generator-jhipster/generators/client')
                    .withOptions({
                        'from-cli': true,
                        build: 'maven',
                        auth: 'jwt',
                        db: 'mysql',
                        skipInstall: true,
                        blueprint: blueprintName,
                        skipChecks: true
                    })
                    .withGenerators([
                        [mockBlueprintSubGen, 'jhipster-myblueprint:client', path.join(__dirname, '../../generators/client/index.js')]
                    ])
                    .withPrompts({
                        baseName: 'jhipster',
                        clientFramework: REACT,
                        enableTranslation: true,
                        nativeLanguage: 'en',
                        languages: ['fr']
                    })
                    .on('end', done);
            });

            it('creates expected files from jhipster client generator', () => {
                assert.file(expectedFiles.client);
                assert.file(expectedFiles.i18nJson);
            });

            it('contains the specific change added by the blueprint', () => {
                assert.fileContent('package.json', /dummy-blueprint-property/);
            });
        });
    });

    describe('generate client with dummy blueprint overriding everything', () => {
        before(done => {
            helpers
                .run('generator-jhipster/generators/client')
                .withOptions({
                    'from-cli': true,
                    skipInstall: true,
                    blueprint: 'myblueprint',
                    skipChecks: true
                })
                .withGenerators([[helpers.createDummyGenerator(), 'jhipster-myblueprint:client']])
                .withPrompts({
                    baseName: 'jhipster',
                    clientFramework: REACT,
                    enableTranslation: true,
                    nativeLanguage: 'en',
                    languages: ['fr']
                })
                .on('end', done);
        });

        it("doesn't create any expected files from jhipster client generator", () => {
            assert.noFile(expectedFiles.client);
        });
    });
});
