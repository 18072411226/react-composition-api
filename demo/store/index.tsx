import React, { useState, useCallback } from 'react';
import { Card, Button, Input } from 'antd';
import { Provider, useStore } from '../../src/store';
import { store, mutations, Store } from './store';
import './index.css';
import 'antd/dist/antd.css';

function Count() {
  const countState = useStore((store: Store) => {
    const { state, computed } = store;
    const { count } = state;
    const { plusOne, plusTwo } = computed;

    return {
      count,
      plusOne,
      plusTwo,
    };
  });

  mutations.log('计数器组件重新渲染💐');

  return (
    <Card hoverable style={{ marginBottom: 24 }}>
      <h1>计数器</h1>
      <div className="chunk">
        <div className="chunk">store中的count现在是 {countState.count}</div>
        <div className="chunk">computed值中的plusOne现在是 {countState.plusOne.value}</div>
        <div className="chunk">嵌套computed值中的plusTwo现在是 {countState.plusTwo.value}</div>
        <Button onClick={mutations.add}>add</Button>
      </div>
    </Card>
  );
}

function Chat() {
  const message = useStore((store: Store) => store.state.message);
  const [value, setValue] = useState('');

  mutations.log('聊天室组件重新渲染💐');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutations.chat(value);
  };

  return (
    <Card hoverable style={{ marginBottom: 24 }}>
      <h1>聊天室</h1>
      当前消息是: {message}
      <form onSubmit={onSubmit}>
        <Input onChange={e => setValue(e.target.value)} placeholder="请输入消息" />
      </form>
    </Card>
  );
}

function Logger() {
  const logs = useStore((store: Store) => {
    return store.state.logs.map((log, idx) => (
      <p className="log" key={idx}>
        {log}
      </p>
    ));
  });

  return (
    <Card hoverable>
      <h1>控制台</h1>
      <div className="logs">{logs}</div>
    </Card>
  );
}

export default () => {
  return (
    <Provider value={store}>
      <div className="flex">
        <div className="left">
          <div className="count">
            <Count />
          </div>
          <div className="chat">
            <Chat />
          </div>
        </div>
        <div className="right">
          <Logger />
        </div>
      </div>
    </Provider>
  );
};
