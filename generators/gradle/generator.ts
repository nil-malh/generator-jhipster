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
/* eslint-disable consistent-return */
import assert from 'assert/strict';

import BaseApplicationGenerator from '../base-application/index.js';

import { GENERATOR_GRADLE, GENERATOR_BOOTSTRAP_APPLICATION_SERVER } from '../generator-list.js';
import files from './files.js';
import { GRADLE } from './constants.js';
import cleanupOldServerFilesTask from './cleanup.js';
import {
  applyFromGradleCallback,
  addGradleDependencyCallback,
  addGradleMavenRepositoryCallback,
  addGradlePluginCallback,
  addGradlePluginManagementCallback,
  addGradlePropertyCallback,
} from './internal/needles.js';

export default class GradleGenerator extends BaseApplicationGenerator {
  async beforeQueue() {
    if (!this.fromBlueprint) {
      await this.composeWithBlueprints(GENERATOR_GRADLE);
    }

    if (!this.delegateToBlueprint) {
      await this.dependsOnJHipster(GENERATOR_BOOTSTRAP_APPLICATION_SERVER);
    }
  }

  get configuring() {
    return this.asConfiguringTaskGroup({
      configure() {
        if (this.jhipsterConfigWithDefaults.buildTool !== GRADLE) {
          this.config.defaults({
            buildTool: GRADLE,
          });
        }
      },
    });
  }

  get [BaseApplicationGenerator.CONFIGURING]() {
    return this.delegateTasksToBlueprint(() => this.configuring);
  }

  get preparing() {
    return this.asPreparingTaskGroup({
      async verify({ application }) {
        assert.equal(application.buildTool, GRADLE);
      },
      addSourceNeddles({ source }) {
        source.applyFromGradle = script => this.editFile('build.gradle', applyFromGradleCallback(script));
        source.addGradleDependency = dependency => this.editFile('build.gradle', addGradleDependencyCallback(dependency));
        source.addGradlePlugin = plugin => this.editFile('build.gradle', addGradlePluginCallback(plugin));
        source.addGradleMavenRepository = repository => this.editFile('build.gradle', addGradleMavenRepositoryCallback(repository));
        source.addGradlePluginManagement = plugin => this.editFile('settings.gradle', addGradlePluginManagementCallback(plugin));
        source.addGradleProperty = property => this.editFile('gradle.properties', addGradlePropertyCallback(property));
      },
    });
  }

  get [BaseApplicationGenerator.PREPARING]() {
    return this.delegateTasksToBlueprint(() => this.preparing);
  }

  get writing() {
    return this.asWritingTaskGroup({
      cleanupOldServerFilesTask,
      async writeFiles({ application }) {
        await this.writeFiles({ sections: files, context: application });
      },
    });
  }

  get [BaseApplicationGenerator.WRITING]() {
    return this.delegateTasksToBlueprint(() => this.writing);
  }
}
