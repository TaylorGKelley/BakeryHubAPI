# Purpose

Contain utility classes related to the infrastructure.

```typescript
export function validateToken(token: string): boolean {
	try {
		verify(token, process.env.API_SECRET || '');
		return true;
	} catch (error) {
		return false;
	}
}
```
