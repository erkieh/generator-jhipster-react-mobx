/**
 * Copyright 2013-2021 the original author or authors from the JHipster project.
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
const { SPRING_WEBSOCKET } = require('generator-jhipster/jdl/jhipster/websocket-types');
const { OAUTH2, SESSION } = require('generator-jhipster/jdl/jhipster/authentication-types');
const { GATEWAY } = require('generator-jhipster/jdl/jhipster/application-types');
const constants = require('generator-jhipster/generators/generator-constants');

const { CLIENT_TEST_SRC_DIR, REACT_DIR, TEST_SRC_DIR, CLIENT_MAIN_SRC_DIR } = constants;

/**
 * The default is to use a file path string. It implies use of the template method.
 * For any other config an object { file:.., method:.., template:.. } can be used
 */
const files = {
  common: [
    {
      templates: [
        '.npmrc',
        'package.json',
        '.eslintrc.json',
        'tsconfig.json',
        'tsconfig.test.json',
        'jest.conf.js',
        'webpack/environment.js',
        'webpack/webpack.common.js',
        'webpack/webpack.dev.js',
        'webpack/webpack.prod.js',
        'webpack/utils.js',
        { file: 'webpack/logo-jhipster.png', method: 'copy' },
      ],
    },
    {
      condition: generator => generator.protractorTests,
      templates: ['tsconfig.e2e.json'],
    },
    {
      templates: ['.eslintignore', 'README.md.jhi.client', `${CLIENT_MAIN_SRC_DIR}manifest.webapp`],
    },
    {
      path: CLIENT_MAIN_SRC_DIR,
      templates: [
        { file: 'content/images/jhipster_family_member_0.svg', method: 'copy' },
        { file: 'content/images/jhipster_family_member_0_head-192.png', method: 'copy' },
        { file: 'content/images/jhipster_family_member_0_head-256.png', method: 'copy' },
        { file: 'content/images/jhipster_family_member_0_head-384.png', method: 'copy' },
        { file: 'content/images/jhipster_family_member_0_head-512.png', method: 'copy' },
        { file: 'content/images/jhipster_family_member_1.svg', method: 'copy' },
        { file: 'content/images/jhipster_family_member_1_head-192.png', method: 'copy' },
        { file: 'content/images/jhipster_family_member_1_head-256.png', method: 'copy' },
        { file: 'content/images/jhipster_family_member_1_head-384.png', method: 'copy' },
        { file: 'content/images/jhipster_family_member_1_head-512.png', method: 'copy' },
        { file: 'content/images/jhipster_family_member_2.svg', method: 'copy' },
        { file: 'content/images/jhipster_family_member_2_head-192.png', method: 'copy' },
        { file: 'content/images/jhipster_family_member_2_head-256.png', method: 'copy' },
        { file: 'content/images/jhipster_family_member_2_head-384.png', method: 'copy' },
        { file: 'content/images/jhipster_family_member_2_head-512.png', method: 'copy' },
        { file: 'content/images/jhipster_family_member_3.svg', method: 'copy' },
        { file: 'content/images/jhipster_family_member_3_head-192.png', method: 'copy' },
        { file: 'content/images/jhipster_family_member_3_head-256.png', method: 'copy' },
        { file: 'content/images/jhipster_family_member_3_head-384.png', method: 'copy' },
        { file: 'content/images/jhipster_family_member_3_head-512.png', method: 'copy' },
        { file: 'content/images/logo-jhipster.png', method: 'copy' },
        { file: 'favicon.ico', method: 'copy' },
        'content/css/loading.css',
        'WEB-INF/web.xml',
        'robots.txt',
        '404.html',
        'index.html',
      ],
    },
  ],
  sass: [
    {
      templates: ['postcss.config.js'],
    },
    {
      condition: generator => generator.enableI18nRTL,
      path: CLIENT_MAIN_SRC_DIR,
      templates: ['content/scss/rtl.scss'],
    },
  ],
  reactApp: [
    {
      path: REACT_DIR,
      templates: [
        { file: 'app.tsx', method: 'processJsx' },
        { file: 'index.tsx', method: 'processJsx' },
        { file: 'routes.tsx', method: 'processJsx' },
        'setup-tests.ts',
        'typings.d.ts',
        'config/constants.ts',
        'config/dayjs.ts',
        'config/axios-interceptor.ts',
        'config/error-middleware.ts',
        'config/logger-middleware.ts',
        'config/notification-middleware-mobx.ts',
        'config/icon-loader.ts',
      ],
    },
    {
      condition: generator => generator.enableTranslation,
      path: REACT_DIR,
      templates: ['config/translation.ts'],
    },
    {
      condition: generator => generator.websocket === SPRING_WEBSOCKET,
      path: REACT_DIR,
      templates: ['config/websocket-middleware.ts'],
    },
    {
      path: REACT_DIR,
      templates: ['app.scss', '_bootstrap-variables.scss'],
    },
  ],
  reactEntities: [
    {
      path: REACT_DIR,
      templates: [{ file: 'entities/index.tsx', method: 'processJsx' }],
    },
  ],
  reactMain: [
    {
      path: REACT_DIR,
      templates: [
        { file: 'modules/home/home.tsx', method: 'processJsx' },
        { file: 'modules/login/logout.tsx', method: 'processJsx' },
      ],
    },
    {
      condition: generator => generator.authenticationType !== OAUTH2,
      path: REACT_DIR,
      templates: [
        { file: 'modules/login/login.tsx', method: 'processJsx' },
        { file: 'modules/login/login-modal.tsx', method: 'processJsx' },
      ],
    },
    {
      condition: generator => generator.authenticationType === OAUTH2,
      path: REACT_DIR,
      templates: [{ file: 'modules/login/login-redirect.tsx', method: 'processJsx' }],
    },
    {
      path: REACT_DIR,
      templates: ['modules/home/home.scss'],
    },
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
        'shared/stores/application-profile.store.ts',
      ],
    },
    {
      condition: generator => generator.enableTranslation,
      path: REACT_DIR,
      templates: ['shared/stores/locale.store.ts'],
    },
    {
      condition: generator => generator.authenticationType === OAUTH2,
      path: REACT_DIR,
      templates: ['shared/stores/user.store.ts'],
    },
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
        { file: 'modules/account/settings/settings.tsx', method: 'processJsx' },
        { file: 'modules/account/register/register.store.ts', method: 'processJsx' },
        { file: 'modules/account/activate/activate.store.ts', method: 'processJsx' },
        { file: 'modules/account/password-reset/password-reset.store.ts', method: 'processJsx' },
        { file: 'modules/account/password/password.store.ts', method: 'processJsx' },
        { file: 'modules/account/settings/settings.store.ts', method: 'processJsx' },
      ],
    },
    {
      condition: generator => generator.authenticationType === SESSION && !generator.skipUserManagement,
      path: REACT_DIR,
      templates: [{ file: 'modules/account/sessions/sessions.tsx', method: 'processJsx' }, 'modules/account/sessions/sessions.store.ts'],
    },
  ],
  adminModule: [
    {
      path: REACT_DIR,
      templates: [
        { file: 'modules/administration/index.tsx', method: 'processJsx' },
        'modules/administration/administration.store.ts',
        { file: 'modules/administration/docs/docs.tsx', method: 'processJsx' },
        'modules/administration/docs/docs.scss',
      ],
    },
    {
      condition: generator => generator.withAdminUi,
      path: REACT_DIR,
      templates: [
        { file: 'modules/administration/configuration/configuration.tsx', method: 'processJsx' },
        { file: 'modules/administration/health/health.tsx', method: 'processJsx' },
        { file: 'modules/administration/health/health-modal.tsx', method: 'processJsx' },
        { file: 'modules/administration/logs/logs.tsx', method: 'processJsx' },
        { file: 'modules/administration/metrics/metrics.tsx', method: 'processJsx' },
      ],
    },
    {
      condition: generator => generator.websocket === SPRING_WEBSOCKET,
      path: REACT_DIR,
      templates: [{ file: 'modules/administration/tracker/tracker.tsx', method: 'processJsx' }],
    },
    {
      condition: generator => !generator.skipUserManagement,
      path: REACT_DIR,
      templates: [
        { file: 'modules/administration/user-management/index.tsx', method: 'processJsx' },
        { file: 'modules/administration/user-management/user-management.tsx', method: 'processJsx' },
        { file: 'modules/administration/user-management/user-management-update.tsx', method: 'processJsx' },
        { file: 'modules/administration/user-management/user-management-detail.tsx', method: 'processJsx' },
        { file: 'modules/administration/user-management/user-management-delete-dialog.tsx', method: 'processJsx' },
        'modules/administration/user-management/user.store.ts',
      ],
    },
    {
      condition: generator => generator.applicationType === GATEWAY && generator.serviceDiscoveryType,
      path: REACT_DIR,
      templates: [{ file: 'modules/administration/gateway/gateway.tsx', method: 'processJsx' }],
    },
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
        { file: 'shared/DurationFormat.tsx', method: 'processJsx' },
        // model
        'shared/model/user.model.ts',
      ],
    },
    {
      condition: generator => generator.enableTranslation,
      path: REACT_DIR,
      templates: [{ file: 'shared/layout/menus/locale.tsx', method: 'processJsx' }],
    },
    {
      condition: generator => generator.authenticationType === OAUTH2,
      path: REACT_DIR,
      templates: ['shared/util/url-utils.ts'],
    },
    {
      condition: generator => generator.authenticationType === SESSION && generator.websocket === SPRING_WEBSOCKET,
      path: REACT_DIR,
      templates: ['shared/util/cookie-utils.ts'],
    },
    {
      path: REACT_DIR,
      templates: [
        'shared/layout/header/header.scss',
        'shared/layout/footer/footer.scss',
        'shared/layout/password/password-strength-bar.scss',
      ],
    },
  ],
  clientTestFw: [
    {
      path: TEST_SRC_DIR,
      templates: [
        // 'jest.conf.js',
        // 'spec/enzyme-setup.ts',
        // 'spec/storage-mock.ts',
        // 'spec/app/utils.ts',
        // 'spec/app/config/axios-interceptor.spec.ts',
        // 'spec/app/modules/administration/administration.store.spec.ts',
        // 'spec/app/shared/util/entity-utils.spec.ts',
        // 'spec/app/shared/auth/private-route.spec.tsx',
        // 'spec/app/shared/error/error-boundary.spec.tsx',
        // 'spec/app/shared/error/error-boundary-route.spec.tsx',
        // 'spec/app/shared/layout/header/header.spec.tsx',
        // 'spec/app/shared/layout/header/header-components.spec.tsx',
        // 'spec/app/shared/layout/menus/account.spec.tsx',
        // 'spec/app/shared/stores/router.store.spec.ts',
        // 'spec/app/shared/stores/authentication.store.spec.ts',
        // 'spec/app/shared/util/base-store.spec.ts',
        // 'spec/app/shared/util/crud-store.spec.ts',
        // 'spec/app/shared/util/base-read-store.spec.ts',
        // 'spec/app/shared/util/base-crud-store.spec.ts',
        // 'spec/app/shared/util/infinite-scroll-crud-store.spec.ts',
        // 'spec/app/config/notification-middleware-mobx.spec.ts',
        // 'spec/app/shared/util/operation-handler.spec.ts',
        // 'spec/app/shared/util/pagination-crud-store.spec.ts',
        // 'spec/app/shared/stores/application-profile.store.spec.ts',
      ],
    },
    {
      condition: generator => !generator.skipUserManagement,
      path: TEST_SRC_DIR,
      templates: [
        // 'spec/app/modules/account/register/register.spec.tsx',
        // 'spec/app/modules/account/register/register.store.spec.ts',
        // 'spec/app/modules/account/activate/activate.store.spec.ts',
        // 'spec/app/modules/account/password/password.store.spec.ts',
        // 'spec/app/modules/account/password-reset/password-reset.store.spec.ts',
        // 'spec/app/modules/account/settings/settings.store.spec.ts',
      ],
    },
    // {
    //   condition: generator => !generator.skipUserManagement,
    //   path: TEST_SRC_DIR,
    //   templates: ['spec/app/modules/administration/user-management/user.store.spec.ts'],
    // },
    // {
    //   condition: generator => generator.enableTranslation,
    //   path: REACT_DIR,
    //   templates: ['shared/reducers/locale.spec.ts'],
    // },
    {
      condition: generator => generator.skipUserManagement && generator.authenticationType === OAUTH2,
      path: REACT_DIR,
      templates: ['shared/reducers/user-management.spec.ts'],
    },
    // {
    //     condition: generator => generator.authenticationType === 'session',
    //     path: REACT_DIR,
    //     templates: [
    //         'modules/account/sessions/sessions.reducer.spec.ts',
    //     ]
    // },
    {
      condition: generator => generator.protractorTests,
      path: CLIENT_TEST_SRC_DIR,
      templates: [
        'e2e/modules/account/account.spec.ts',
        'e2e/modules/administration/administration.spec.ts',
        'e2e/util/utils.ts',
        'e2e/page-objects/base-component.ts',
        'e2e/page-objects/navbar-page.ts',
        'e2e/page-objects/signin-page.ts',
        'protractor.conf.js',
      ],
    },
    {
      condition: generator => generator.protractorTests && !generator.skipUserManagement,
      path: CLIENT_TEST_SRC_DIR,
      templates: ['e2e/page-objects/password-page.ts', 'e2e/page-objects/settings-page.ts', 'e2e/page-objects/register-page.ts'],
    },
  ],
  swagger: [
    {
      condition: generator => !generator.applicationTypeMicroservice,
      path: CLIENT_MAIN_SRC_DIR,
      templates: ['swagger-ui/index.html', { file: 'swagger-ui/dist/images/throbber.gif', method: 'copy' }],
    },
  ],
};

module.exports = {
  writeFiles,
  files,
};

function writeFiles() {
  // write React files
  return this.writeFilesToDisk(files, 'react');
}
