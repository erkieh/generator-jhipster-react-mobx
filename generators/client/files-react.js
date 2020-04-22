/**
 * Copyright 2013-2020 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://jhipster.github.io/
 * for more information.
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
const mkdirp = require('mkdirp');
const constants = require('generator-jhipster/generators/generator-constants');

/* Constants use throughout */
const MAIN_SRC_DIR = constants.CLIENT_MAIN_SRC_DIR;
const TEST_SRC_DIR = constants.CLIENT_TEST_SRC_DIR;
const REACT_DIR = constants.ANGULAR_DIR;

/**
 * The default is to use a file path string. It implies use of the template method.
 * For any other config an object { file:.., method:.., template:.. } can be used
 */
const files = {
    common: [
        {
            templates: [
                'package.json',
                '.eslintrc.json',
                '.eslintignore',
                'tsconfig.json',
                'tsconfig.test.json',
                { file: '.editorconfig', method: 'copy', noEjs: true },
                'webpack/logo-jhipster.png',
                'webpack/webpack.common.js',
                'webpack/webpack.dev.js',
                'webpack/webpack.prod.js',
                'webpack/utils.js'
            ]
        },
        {
            condition: generator => generator.protractorTests,
            templates: ['tsconfig.e2e.json']
        },
        {
            condition: generator => !generator.skipCommitHook,
            templates: ['.huskyrc', '.lintstagedrc.js']
        }
    ],
    sass: [
        {
            templates: ['postcss.config.js']
        },
        {
            condition: generator => generator.enableI18nRTL,
            path: MAIN_SRC_DIR,
            templates: ['app/rtl.scss']
        }
    ],
    image: [
        {
            path: MAIN_SRC_DIR,
            templates: [
                { file: 'content/images/jhipster_family_member_0.svg', method: 'copy' },
                { file: 'content/images/jhipster_family_member_1.svg', method: 'copy' },
                { file: 'content/images/jhipster_family_member_2.svg', method: 'copy' },
                { file: 'content/images/jhipster_family_member_3.svg', method: 'copy' },
                { file: 'content/images/jhipster_family_member_0_head-192.png', method: 'copy' },
                { file: 'content/images/jhipster_family_member_1_head-192.png', method: 'copy' },
                { file: 'content/images/jhipster_family_member_2_head-192.png', method: 'copy' },
                { file: 'content/images/jhipster_family_member_3_head-192.png', method: 'copy' },
                { file: 'content/images/jhipster_family_member_0_head-256.png', method: 'copy' },
                { file: 'content/images/jhipster_family_member_1_head-256.png', method: 'copy' },
                { file: 'content/images/jhipster_family_member_2_head-256.png', method: 'copy' },
                { file: 'content/images/jhipster_family_member_3_head-256.png', method: 'copy' },
                { file: 'content/images/jhipster_family_member_0_head-384.png', method: 'copy' },
                { file: 'content/images/jhipster_family_member_1_head-384.png', method: 'copy' },
                { file: 'content/images/jhipster_family_member_2_head-384.png', method: 'copy' },
                { file: 'content/images/jhipster_family_member_3_head-384.png', method: 'copy' },
                { file: 'content/images/jhipster_family_member_0_head-512.png', method: 'copy' },
                { file: 'content/images/jhipster_family_member_1_head-512.png', method: 'copy' },
                { file: 'content/images/jhipster_family_member_2_head-512.png', method: 'copy' },
                { file: 'content/images/jhipster_family_member_3_head-512.png', method: 'copy' },
                { file: 'content/images/logo-jhipster.png', method: 'copy' }
            ]
        }
    ],
    swagger: [
        {
            condition: generator => !generator.reactive,
            path: MAIN_SRC_DIR,
            templates: ['swagger-ui/index.html', { file: 'swagger-ui/dist/images/throbber.gif', method: 'copy' }]
        }
    ],
    commonWeb: [
        {
            path: MAIN_SRC_DIR,
            templates: [
                'WEB-INF/web.xml',
                { file: 'favicon.ico', method: 'copy' },
                'robots.txt',
                '404.html',
                'index.html',
                'manifest.webapp',
                'content/css/loading.css'
            ]
        }
    ],
    reactApp: [
        {
            path: REACT_DIR,
            templates: [
                { file: 'app.tsx', method: 'processJsx' },
                { file: 'index.tsx', method: 'processJsx' },
                { file: 'routes.tsx', method: 'processJsx' },
                'typings.d.ts',
                'config/constants.ts',
                'config/axios-interceptor.ts',
                'config/error-middleware.ts',
                'config/logger-middleware.ts',
                'config/notification-middleware-mobx.ts',
                'config/icon-loader.ts'
            ]
        },
        {
            condition: generator => generator.enableTranslation,
            path: REACT_DIR,
            templates: ['config/translation.ts']
        },
        {
            condition: generator => generator.websocket === 'spring-websocket',
            path: REACT_DIR,
            templates: ['config/websocket-middleware.ts']
        },
        {
            path: REACT_DIR,
            templates: ['app.scss', '_bootstrap-variables.scss']
        }
    ],
    reactEntities: [
        {
            path: REACT_DIR,
            templates: [{ file: 'entities/index.tsx', method: 'processJsx' }]
        }
    ],
    reactMain: [
        {
            path: REACT_DIR,
            templates: [
                { file: 'modules/home/home.tsx', method: 'processJsx' },
                { file: 'modules/login/logout.tsx', method: 'processJsx' }
            ]
        },
        {
            condition: generator => generator.authenticationType !== 'oauth2',
            path: REACT_DIR,
            templates: [
                { file: 'modules/login/login.tsx', method: 'processJsx' },
                { file: 'modules/login/login-modal.tsx', method: 'processJsx' }
            ]
        },
        {
            path: REACT_DIR,
            templates: ['modules/home/home.scss']
        }
    ],
    stores: [
        {
            path: REACT_DIR,
            templates: [
                'shared/stores/createStore.ts',
                'shared/stores/index.ts',
                'shared/stores/router.store.ts',
                'shared/stores/authentication.store.ts',
                'shared/stores/loading-bar.store.ts',
                'shared/util/base-store.ts',
                'shared/util/crud-store.ts',
                'shared/util/base-read-store.ts',
                'shared/util/base-crud-store.ts',
                'shared/util/infinite-scroll-crud-store.ts',
                'shared/util/typed-inject.ts',
                'shared/util/jhipster-types.ts',
                'shared/util/operation-handler.ts',
                'shared/util/pagination-crud-store.ts',
                'shared/stores/application-profile.store.ts'
            ]
        },
        {
            condition: generator => generator.enableTranslation,
            path: REACT_DIR,
            templates: ['shared/stores/locale.store.ts']
        },
        {
            condition: generator => generator.authenticationType === 'oauth2',
            path: REACT_DIR,
            templates: ['shared/stores/user.store.ts']
        }
    ],
    accountModule: [
        {
            condition: generator => !generator.skipUserManagement,
            path: REACT_DIR,
            templates: [
                { file: 'modules/account/index.tsx', method: 'processJsx' },
                { file: 'modules/account/activate/activate.tsx', method: 'processJsx' },
                { file: 'modules/account/password/password.tsx', method: 'processJsx' },
                { file: 'modules/account/register/register.tsx', method: 'processJsx' },
                { file: 'modules/account/password-reset/init/password-reset-init.tsx', method: 'processJsx' },
                { file: 'modules/account/password-reset/finish/password-reset-finish.tsx', method: 'processJsx' },
                { file: 'modules/account/settings/settings.tsx', method: 'processJsx' }
            ]
        },
        {
            condition: generator => generator.authenticationType === 'session' && !generator.skipUserManagement,
            path: REACT_DIR,
            templates: [
                { file: 'modules/account/sessions/sessions.tsx', method: 'processJsx' },
                'modules/account/sessions/sessions.store.ts'
            ]
        }
    ],
    accountModuleStores: [
        {
            condition: generator => generator.authenticationType !== 'oauth2',
            path: REACT_DIR,
            templates: [
                { file: 'modules/account/register/register.store.ts', method: 'processJsx' },
                { file: 'modules/account/activate/activate.store.ts', method: 'processJsx' },
                { file: 'modules/account/password-reset/password-reset.store.ts', method: 'processJsx' },
                { file: 'modules/account/password/password.store.ts', method: 'processJsx' },
                { file: 'modules/account/settings/settings.store.ts', method: 'processJsx' }
            ]
        },
        {
            condition: generator => generator.authenticationType === 'session',
            path: REACT_DIR,
            templates: ['modules/account/sessions/sessions.store.ts']
        }
    ],
    adminModule: [
        {
            path: REACT_DIR,
            templates: [
                // admin modules
                { file: 'modules/administration/index.tsx', method: 'processJsx' },
                { file: 'modules/administration/configuration/configuration.tsx', method: 'processJsx' },
                { file: 'modules/administration/docs/docs.tsx', method: 'processJsx' },
                'modules/administration/docs/docs.scss',
                { file: 'modules/administration/health/health.tsx', method: 'processJsx' },
                { file: 'modules/administration/health/health-modal.tsx', method: 'processJsx' },
                { file: 'modules/administration/logs/logs.tsx', method: 'processJsx' },
                { file: 'modules/administration/metrics/metrics.tsx', method: 'processJsx' }
            ]
        },
        {
            condition: generator => !['no', 'cassandra'].includes(generator.databaseType),
            path: REACT_DIR,
            templates: [{ file: 'modules/administration/audits/audits.tsx', method: 'processJsx' }]
        },
        {
            condition: generator => generator.websocket === 'spring-websocket',
            path: REACT_DIR,
            templates: [{ file: 'modules/administration/tracker/tracker.tsx', method: 'processJsx' }]
        },
        {
            condition: generator => !generator.skipUserManagement,
            path: REACT_DIR,
            templates: [
                { file: 'modules/administration/user-management/index.tsx', method: 'processJsx' },
                { file: 'modules/administration/user-management/user-management.tsx', method: 'processJsx' },
                { file: 'modules/administration/user-management/user-management-update.tsx', method: 'processJsx' },
                { file: 'modules/administration/user-management/user-management-detail.tsx', method: 'processJsx' },
                { file: 'modules/administration/user-management/user-management-delete-dialog.tsx', method: 'processJsx' }
            ]
        },
        {
            condition: generator => generator.applicationType === 'gateway' && generator.serviceDiscoveryType,
            path: REACT_DIR,
            templates: [{ file: 'modules/administration/gateway/gateway.tsx', method: 'processJsx' }]
        }
    ],
    adminModuleStores: [
        {
            path: REACT_DIR,
            templates: [
                // admin modules
                'modules/administration/administration.store.ts'
            ]
        },
        {
            condition: generator => !generator.skipUserManagement,
            path: REACT_DIR,
            templates: ['modules/administration/user-management/user.store.ts']
        }
    ],
    reactShared: [
        {
            path: REACT_DIR,
            templates: [
                // layouts
                { file: 'shared/layout/footer/footer.tsx', method: 'processJsx' },
                { file: 'shared/layout/header/header.tsx', method: 'processJsx' },
                { file: 'shared/layout/header/header-components.tsx', method: 'processJsx' },
                'shared/layout/menus/index.ts',
                { file: 'shared/layout/menus/admin.tsx', method: 'processJsx' },
                { file: 'shared/layout/menus/account.tsx', method: 'processJsx' },
                { file: 'shared/layout/menus/entities.tsx', method: 'processJsx' },
                { file: 'shared/layout/menus/menu-components.tsx', method: 'processJsx' },
                { file: 'shared/layout/menus/menu-item.tsx', method: 'processJsx' },
                { file: 'shared/layout/password/password-strength-bar.tsx', method: 'processJsx' },
                // util
                'shared/util/date-utils.ts',
                'shared/util/pagination.constants.ts',
                'shared/util/entity-utils.ts',
                // components
                { file: 'shared/auth/private-route.tsx', method: 'processJsx' },
                { file: 'shared/error/error-boundary.tsx', method: 'processJsx' },
                { file: 'shared/error/error-boundary-route.tsx', method: 'processJsx' },
                { file: 'shared/error/page-not-found.tsx', method: 'processJsx' },
                // model
                'shared/model/user.model.ts'
            ]
        },
        {
            condition: generator => generator.enableTranslation,
            path: REACT_DIR,
            templates: [{ file: 'shared/layout/menus/locale.tsx', method: 'processJsx' }]
        },
        {
            condition: generator => generator.authenticationType === 'oauth2',
            path: REACT_DIR,
            templates: ['shared/util/url-utils.ts']
        },
        {
            condition: generator => generator.authenticationType === 'session' && generator.websocket === 'spring-websocket',
            path: REACT_DIR,
            templates: ['shared/util/cookie-utils.ts']
        },
        {
            path: REACT_DIR,
            templates: [
                'shared/layout/header/header.scss',
                'shared/layout/footer/footer.scss',
                'shared/layout/password/password-strength-bar.scss'
            ]
        }
    ],
    clientTestFw: [
        {
            path: TEST_SRC_DIR,
            templates: [
                'jest.conf.js',
                'spec/enzyme-setup.ts',
                'spec/storage-mock.ts',
                'spec/app/utils.ts',
                'spec/app/config/axios-interceptor.spec.ts',
                'spec/app/modules/administration/administration.store.spec.ts',
                'spec/app/shared/util/entity-utils.spec.ts',
                'spec/app/shared/auth/private-route.spec.tsx',
                'spec/app/shared/error/error-boundary.spec.tsx',
                'spec/app/shared/error/error-boundary-route.spec.tsx',
                'spec/app/shared/layout/header/header.spec.tsx',
                'spec/app/shared/layout/header/header-components.spec.tsx',
                'spec/app/shared/layout/menus/account.spec.tsx',
                'spec/app/shared/stores/router.store.spec.ts',
                'spec/app/shared/stores/authentication.store.spec.ts',
                'spec/app/shared/util/base-store.spec.ts',
                'spec/app/shared/util/crud-store.spec.ts',
                'spec/app/shared/util/base-read-store.spec.ts',
                'spec/app/shared/util/base-crud-store.spec.ts',
                'spec/app/shared/util/infinite-scroll-crud-store.spec.ts',
                'spec/app/config/notification-middleware-mobx.spec.ts',
                'spec/app/shared/util/operation-handler.spec.ts',
                'spec/app/shared/util/pagination-crud-store.spec.ts',
                'spec/app/shared/stores/application-profile.store.spec.ts'
            ]
        },
        {
            condition: generator => !generator.skipUserManagement,
            path: TEST_SRC_DIR,
            templates: [
                'spec/app/modules/account/register/register.spec.tsx',
                'spec/app/modules/account/register/register.store.spec.ts',
                'spec/app/modules/account/activate/activate.store.spec.ts',
                'spec/app/modules/account/password/password.store.spec.ts',
                'spec/app/modules/account/password-reset/password-reset.store.spec.ts',
                'spec/app/modules/account/settings/settings.store.spec.ts',
                'spec/app/modules/administration/user-management/user.store.spec.ts'
            ]
        },
        {
            condition: generator => generator.enableTranslation,
            path: TEST_SRC_DIR,
            templates: ['spec/app/shared/stores/locale.store.spec.ts', 'spec/app/config/translation.spec.ts']
        },
        {
            condition: generator => generator.protractorTests,
            path: TEST_SRC_DIR,
            templates: [
                'e2e/modules/account/account.spec.ts',
                'e2e/modules/administration/administration.spec.ts',
                'e2e/util/utils.ts',
                'e2e/page-objects/base-component.ts',
                'e2e/page-objects/navbar-page.ts',
                'e2e/page-objects/signin-page.ts',
                'protractor.conf.js'
            ]
        },
        {
            condition: generator => generator.protractorTests && !generator.skipUserManagement,
            path: TEST_SRC_DIR,
            templates: ['e2e/page-objects/password-page.ts', 'e2e/page-objects/settings-page.ts', 'e2e/page-objects/register-page.ts']
        }
    ]
};

module.exports = {
    writeFiles,
    files
};

function writeFiles() {
    mkdirp(MAIN_SRC_DIR);
    // write React files
    this.writeFilesToDisk(files, this, false, 'react');
}
