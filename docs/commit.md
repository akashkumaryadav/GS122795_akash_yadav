# Commit Guidelines

## **Commit Message Format**
Each commit message should follow this format:
```
<type>(<scope>): <message>
```
### **Example:**
```
feat(auth): add Firebase authentication
fix(planning): correct GM% calculation logic
chore(deps): update AG-Grid to latest version
```

## **Commit Types**
- **feat**: A new feature
- **fix**: A bug fix
- **refactor**: Code changes that neither fix a bug nor add a feature
- **chore**: Routine maintenance, dependency updates, build process changes
- **docs**: Documentation changes
- **style**: Formatting changes (no logic change)
- **test**: Adding or updating tests
- **perf**: Performance improvements

## **Commit Best Practices**
- Keep commit messages **concise yet descriptive**.
- Group related changes in **single commits**.
- Use **present tense** (e.g., "add" instead of "added").
- Use **imperative mood** (e.g., "fix bug" instead of "fixed bug").
- Avoid committing **unrelated changes**.

## **Branching Strategy**
- `main` → Stable production-ready code.
- `dev` → Active development branch.
- `feature/your-feature-name` → New features.
- `fix/your-bug-name` → Bug fixes.

## **Commit Message Example for Complex Changes**
```
feat(planning): implement AG-Grid conditional formatting

- Add GM% color coding (green/yellow/orange/red)
- Update grid rendering for performance optimization
- Ensure state updates correctly with Redux
```

## **Final Notes**
- Before committing, **run tests** and ensure no linting errors.
- Keep **PRs small and focused**.
- Write detailed commit messages when introducing breaking changes.

