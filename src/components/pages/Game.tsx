import { useState } from 'react';
import { Attempts, Field } from '../game';
import { GameContainer, NavGame, TabsContent } from '../layouts/GameLayouts';

export const Game = () => {
  const [activeTab, setActiveTab] = useState('game');

  const tabs = [{ label: 'game', content: <Field /> }, { label: 'attempts', content: <Attempts /> }];

  return (
    <GameContainer>
      <NavGame activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <TabsContent>
        {tabs.find(tab => tab.label === activeTab)?.content}
      </TabsContent>
    </GameContainer>
  );
};
