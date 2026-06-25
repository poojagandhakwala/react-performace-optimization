import { OptimizationModule } from '../types';

export const PERFORMANCE_MODULES: OptimizationModule[] = [
  {
    id: "memoization",
    title: "Preventing Re-renders",
    description:
      "Learn how to use React.memo, useMemo, and useCallback to avoid unnecessary updates.",
    whyMatters:
      "By default, React re-renders all children when a parent state changes. In large trees, this causes noticeable lag.",
    whenToUse:
      "When you have leaf components with many props, or expensive computations that don't need to run every render.",
    beforeCode: `// Before: Parent state change re-renders Child
function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  
  // New function created every render
  const handleClick = () => console.log(name);

  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      <Child onClick={handleClick} />
    </>
  );
}`,
    afterCode: `// After: Memoized components and callbacks
const Child = React.memo(({ onClick }) => {
  return <button onClick={onClick}>Memoized Child</button>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  const handleClick = useCallback(() => {
    console.log(name);
  }, [name]); // Only changes when name changes

  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      <Child onClick={handleClick} />
    </>
  );
}`,
    icon: "Zap",
  },
  {
    id: "calculation",
    title: "Expensive Calculations",
    description: "Use useMemo to cache the result of heavy computations.",
    whyMatters:
      "If a render includes a 10ms calculation, and it re-runs 100 times, you lose 1 second of main thread time.",
    whenToUse:
      "Filtering, sorting, data transformations, or any loop over large sets.",
    beforeCode: `// Before: Re-calculates on every render
function Stats({ items }) {
  const total = items.reduce((sum, item) => sum + item.val, 0);
  return <div>Total: {total}</div>;
}`,
    afterCode: `// After: Only re-calculates if items change
function Stats({ items }) {
  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.val, 0);
  }, [items]);
  return <div>Total: {total}</div>;
}`,
    icon: "Zap",
  },
  {
    id: "virtualization",
    title: "List Virtualization",
    description:
      "Render only what is visible to the user, saving memory and CPU.",
    whyMatters:
      "DOM nodes are expensive. Rendering 10,000 items at once can crash a browser tab or cause extreme jank.",
    whenToUse:
      "Any list longer than 100-200 items, especially if items are complex.",
    beforeCode: `// Before: Native map rendering 1000 items
function LargeList({ items }) {
  return (
    <div className="h-[400px] overflow-auto">
      {items.map(item => (
        <div key={item.id}>{item.text}</div>
      ))}
    </div>
  );
}`,
    afterCode: `// After: Using react-window
import { FixedSizeList as List } from 'react-window';

function LargeList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>{items[index].text}</div>
  );

  return (
    <List
      height={400}
      itemCount={items.length}
      itemSize={35}
      width="100%"
    >
      {Row}
    </List>
  );
}`,
    icon: "List",
  },
  //   {
  //     id: 'transitions',
  //     title: 'Transitions & Deferred Values',
  //     description: 'Prioritize urgent updates (typing) over non-urgent ones (filtering lists).',
  //     whyMatters: 'Synchronous rendering blocks the main thread. If a filter takes 200ms, typing feels sluggish.',
  //     whenToUse: 'Search filters, complex visualizations, or data-heavy views that respond to frequent user input.',
  //     beforeCode: `// Before: Sync update causes lag
  // function Search() {
  //   const [query, setQuery] = useState("");
  //   const [list, setList] = useState([]);

  //   const handleChange = (e) => {
  //     setQuery(e.target.value);
  //     setList(filterHeavyData(e.target.value));
  //   };

  //   return <input value={query} onChange={handleChange} />;
  // }`,
  //     afterCode: `// After: useTransition for smooth UI
  // function Search() {
  //   const [query, setQuery] = useState("");
  //   const [list, setList] = useState([]);
  //   const [isPending, startTransition] = useTransition();

  //   const handleChange = (e) => {
  //     setQuery(e.target.value);
  //     startTransition(() => {
  //       setList(filterHeavyData(e.target.value));
  //     });
  //   };

  //   return (
  //     <>
  //       <input value={query} onChange={handleChange} />
  //       {isPending && <Spinner />}
  //       <List data={list} />
  //     </>
  //   );
  // }`,
  //     icon: 'Clock'
  //   },

  {
    id: "deferred",
    title: "Deferred Values",
    description:
      "De-prioritize a piece of state so it doesn't block more urgent updates.",
    whyMatters:
      "Similar to transitions, but for data passed down from parents that you don't control.",
    whenToUse:
      'When you want to show a "stale" version of UI while the fresh one is loading.',
    beforeCode: `// Before: Laggy search results
function Results({ query }) {
  const items = useSlowSearch(query);
  return <List items={items} />;
}`,
    afterCode: `// After: useDeferredValue for stale UI
function Results({ query }) {
  const deferredQuery = useDeferredValue(query);
  const items = useSlowSearch(deferredQuery);
  const isStale = query !== deferredQuery;

  return (
    <div style={{ opacity: isStale ? 0.5 : 1 }}>
      <List items={items} />
    </div>
  );
}`,
    icon: "Search",
  },
];
