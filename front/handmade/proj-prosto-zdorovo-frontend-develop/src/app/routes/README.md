Router layer

Правила работы с роутером

1. Используем ленивые роуты для тяжелых роутов
2. Использовать `Link` для переходов
3. Для репозиториев использовать контекст

```tsx
export const Route = createFileRoute('...')({
  context: () => ({
    entityRepository: new EntityRepository({ api: new AppEntityApi() }),
  }),
});
```

4. Использовать префетчинг данных для роутов

```tsx
export const Route = createFileRoute('...')({
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(
      useEntities.options(context.entityRepository),
    );
  },
});
```

5. Не используем вертску внутри роутов, выносим в отдельные компоненты и страницы

```tsx
export const Route = createFileRoute('...')({
  component: EntitiesPage,
});
```

6. Использовать meta для заголовков страницы
