# Design Document: Dependency Updates

## Overview

The dependency update system uses existing command-line tools to update all dependencies to their latest stable versions. The approach is purely shell-based, leveraging `npm-check-updates` (already installed) and npm's built-in commands, with git for backup and rollback.

## Architecture

Simple shell command workflow:

1. **Backup**: Use git to create a commit before updates
2. **Check**: Use `ncu` to see what needs updating
3. **Update**: Use `ncu -u` with target flags for different update types
4. **Install**: Use `npm install` to apply changes
5. **Verify**: Use existing `npm run build` and `npm run dev` to test
6. **Cleanup**: Use `npm audit` and `npm prune` for security and cleanup
7. **Rollback**: Use `git reset --hard` if issues occur

### Design Decisions

- **Shell Commands Only**: No custom scripts, no package.json modifications
- **Existing Tools**: Use `npm-check-updates`, npm built-ins, and git
- **Manual Process**: Developer runs commands manually with verification steps
- **Git-Based Safety**: Simple commit/rollback workflow

## Command Workflow

### Basic Update Process
```bash
# 1. Create update branch (main stays as backup)
git checkout -b dependency-updates

# 2. Check what needs updating
ncu

# 3. Update (choose one based on risk tolerance)
ncu --target patch -u    # Patch updates only
ncu --target minor -u    # Minor updates
ncu --target major -u    # Major updates (careful!)
ncu -u                   # All updates

# 4. Install updates
npm install

# 5. Verify build works
npm run build

# 6. Test dev server
npm run dev

# 7. Security check and cleanup
npm audit
npm prune

# 8. If everything works, commit and merge
git add . && git commit -m "Update dependencies"
git checkout main
git merge dependency-updates
git branch -d dependency-updates

# 9. If problems occur, abandon branch and return to main
git checkout main
git branch -D dependency-updates  # force delete problematic branch
```

### Existing Tools Used

- **npm-check-updates (ncu)**: Already installed, handles dependency analysis and updates
- **npm install**: Applies package.json changes
- **npm audit**: Security vulnerability scanning
- **npm prune**: Removes unused dependencies
- **npm run build**: Existing TypeScript/Next.js build verification
- **npm run dev**: Existing development server for runtime testing
- **git**: Version control for backup and rollback

## Error Handling

- **Build Failures**: Stop process, check errors, abandon update branch if needed
- **Runtime Issues**: Manual verification during `npm run dev`
- **Security Issues**: Address with `npm audit fix` or manual updates
- **Rollback**: Switch back to main branch and delete problematic update branch

## Testing Strategy

1. **Pre-Update**: Ensure current build works (`npm run build`)
2. **Post-Update Build**: Verify TypeScript compilation succeeds
3. **Runtime Test**: Start dev server and manually verify key functionality
4. **Security Scan**: Check for vulnerabilities with `npm audit`

The design is intentionally minimal - just documented shell commands using existing tools, no custom code required.