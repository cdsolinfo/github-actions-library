const core = require('@actions/core')
const bumpVersion = require('semver-increment');

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
    try {
        const versionLevel = core.getInput('version-level');
        core.debug(`Version Level ${versionLevel} to use to increment!`);
        
        const version = core.getInput('version');
        core.debug(`Version to increment ${version}`);
        
        var masks = [versionLevel === '-M' ? 1 : 0, versionLevel === '-m' ? 1 : 0, versionLevel === '-p' ? 1 : 0];
        
        core.debug(`mask to increment semver ${masks}`);
        
        var nextVersion = bumpVersion(masks, version);
        
        core.setOutput("version", nextVersion);
        
        } catch (error) {
            core.setFailed(error.message);
        }
}

module.exports = {
  run
}