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

const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const constants = require('generator-jhipster/generators/generator-constants');
const expectedFiles = require('../utils/expected-files');

const REACT = constants.SUPPORTED_CLIENT_FRAMEWORKS.REACT;

describe('JHipster client generator with blueprint', () => {
  describe('generate client with dummy blueprint overriding everything', () => {
    before(done => {
      helpers
        .run('generator-jhipster/generators/client')
        .withOptions({
          fromCli: true,
          skipInstall: true,
          blueprint: 'react-mobx',
          skipChecks: true,
        })
        .withGenerators([[helpers.createDummyGenerator(), 'jhipster-react-mobx:client']])
        .withPrompts({
          baseName: 'jhipster',
          clientFramework: REACT,
          enableTranslation: true,
          nativeLanguage: 'en',
          languages: ['fr'],
        })
        .on('end', done);
    });

    it("doesn't create any expected files from jhipster client generator", () => {
      assert.noFile(expectedFiles.client);
    });
  });
});
