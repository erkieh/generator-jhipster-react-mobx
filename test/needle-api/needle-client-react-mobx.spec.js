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
const ClientGenerator = require('../../generators/client');

const REACT = constants.SUPPORTED_CLIENT_FRAMEWORKS.REACT;
const CLIENT_MAIN_SRC_DIR = constants.CLIENT_MAIN_SRC_DIR;

const mockBlueprintSubGen = class extends ClientGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error('This is a JHipster blueprint and should be used only like jhipster --blueprints myblueprint');
        }

        this.configOptions = jhContext.configOptions || {};
        // This sets up options for this sub generator and is being reused from JHipster
        jhContext.setupEntityOptions(this, jhContext, this);
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
            addAppCssStep() {
                // please change this to public API when it will be available see https://github.com/jhipster/generator-jhipster/issues/9234
                this.addAppSCSSStyle('@import without-comment');
                this.addAppSCSSStyle('@import with-comment', 'my comment');
            },
            addEntityToMenuStep() {
                this.addEntityToMenu('routerName', false, REACT, false);
            },
            addEntityToModuleStep() {
                this.addEntityToModule(
                    'entityInstance',
                    'entityClass',
                    'entityName',
                    'entityFolderName',
                    'entityFileName',
                    'entityUrl',
                    REACT,
                    'microServiceNam'
                );
            }
        };
        return { ...phaseFromJHipster, ...customPhaseSteps };
    }
};

describe('needle API React: JHipster client generator with blueprint', () => {
    before(done => {
        helpers
            .run('generator-jhipster/generators/client')
            .withOptions({
                'from-cli': true,
                build: 'maven',
                auth: 'jwt',
                db: 'mysql',
                skipInstall: true,
                blueprint: 'myblueprint',
                skipChecks: true,
                skipServer: true
            })
            .withGenerators([
                [mockBlueprintSubGen, 'jhipster-myblueprint:client', path.join(__dirname, '../../generators/client/index.js')]
            ])
            .withPrompts({
                baseName: 'jhipster',
                clientFramework: REACT,
                enableTranslation: true,
                nativeLanguage: 'en',
                languages: ['en', 'fr']
            })
            .on('end', done);
    });

    it('Assert entity is added to menu', () => {
        assert.fileContent(
            `${CLIENT_MAIN_SRC_DIR}app/shared/layout/menus/entities.tsx`,
            '<MenuItem icon="asterisk" to="/routerName">\n      Router Name\n    </MenuItem>'
        );
    });

    it('Assert entity is added to module', () => {
        const indexModulePath = `${CLIENT_MAIN_SRC_DIR}app/entities/index.tsx`;
        const indexReducerPath = `${CLIENT_MAIN_SRC_DIR}app/shared/reducers/index.ts`;
        const indexStorePath = `${CLIENT_MAIN_SRC_DIR}app/shared/stores/createStore.ts`;

        assert.noFile(indexReducerPath);
        assert.fileContent(indexModulePath, "import entityName from './entityFolderName';");
        assert.fileContent(indexModulePath, '<ErrorBoundaryRoute path={`${match.url}entityFileName`} component={entityName} />'); // eslint-disable-line

        assert.fileContent(
            indexStorePath,
            '// prettier-ignore\n' +
                'import entityInstance, {\n' +
                '  entityNameStore\n' +
                "} from 'app/entities/entityFolderName/entityFileName.store';"
        );
        assert.fileContent(indexStorePath, 'readonly entityInstanceStore: entityNameStore;');
        assert.fileContent(indexStorePath, 'rootStore.entityInstanceStore = new entityNameStore(rootStore);');
    });

    it('Assert app.scss is updated', () => {
        assert.fileContent(`${CLIENT_MAIN_SRC_DIR}app/app.scss`, '@import without-comment');
        assert.fileContent(`${CLIENT_MAIN_SRC_DIR}app/app.scss`, '@import with-comment');
        assert.fileContent(
            `${CLIENT_MAIN_SRC_DIR}app/app.scss`,
            '* ==========================================================================\n' +
                'my comment\n' +
                '========================================================================== */\n'
        );
    });
});
