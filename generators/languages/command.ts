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
import { JHipsterCommandDefinition } from '../base/api.js';

const command: JHipsterCommandDefinition = {
  arguments: {
    languages: {
      description: 'Languages to generate',
      type: Array,
      required: false,
    },
  },
  options: {
    enableTranslation: {
      description: 'Enable translation',
      type: Boolean,
      required: false,
      scope: 'storage',
    },
    language: {
      alias: 'l',
      description: 'Language to be added to application (existing languages are not removed)',
      type: Array,
    },
    nativeLanguage: {
      alias: 'n',
      description: 'Set application native language',
      type: String,
      required: false,
    },
    regenerateLanguages: {
      description: 'Regenerate languages',
      type: Boolean,
      scope: 'generator',
    },
  },
};

export default command;
