/* eslint-disable no-unused-expressions, no-console */

import { expect } from 'chai';
import { describe, it, beforeEach } from 'esmocha';

import { createProgram } from './program.mjs';
import { defaultHelpers as helpers } from '../test/support/index.js';

describe('cli - program', () => {
  beforeEach(async () => {
    await helpers.prepareTemporaryDir();
  });

  describe('adding a negative option', () => {
    it('when executing should not set insight', () => {
      return createProgram()
        .exitOverride(error => {
          throw error;
        })
        .parseAsync(['jhipster', 'jhipster'])
        .then(command => {
          expect(command.opts().insight).to.be.undefined;
        });
    });
    it('when executing with --insight should set insight to true', () => {
      return createProgram()
        .exitOverride(error => {
          throw error;
        })
        .parseAsync(['jhipster', 'jhipster', '--insight'])
        .then(command => {
          expect(command.opts().insight).to.be.true;
        });
    });
    it('when executing with --no-insight should set insight to true', () => {
      return createProgram()
        .exitOverride(error => {
          throw error;
        })
        .parseAsync(['jhipster', 'jhipster', '--no-insight'])
        .then(command => {
          expect(command.opts().insight).to.be.false;
        });
    });
  });

  describe('adding a option with default value', () => {
    it('when executing should not set insight', () => {
      return createProgram()
        .exitOverride(error => {
          throw error;
        })
        .parseAsync(['jhipster', 'jhipster'])
        .then(command => {
          expect(command.opts().skipYoResolve).to.be.false;
        });
    });
    it('when executing with --skip-yo-resolve should set insight to true', () => {
      return createProgram()
        .exitOverride(error => {
          throw error;
        })
        .parseAsync(['jhipster', 'jhipster', '--skip-yo-resolve'])
        .then(command => {
          expect(command.opts().skipYoResolve).to.be.true;
        });
    });
    it('when executing with --no-skip-yo-resolve should set insight to false', () => {
      return createProgram()
        .exitOverride(error => {
          throw error;
        })
        .parseAsync(['jhipster', 'jhipster', '--no-skip-yo-resolve'])
        .then(command => {
          expect(command.opts().skipYoResolve).to.be.false;
        });
    });
  });
});
