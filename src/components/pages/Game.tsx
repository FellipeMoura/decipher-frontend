import { useState } from 'react';

import { Crown, Camera } from 'lucide-react';
import { Attempts, Field } from '../game';




export const Game = () => {
  const [activeTab, setActiveTab] = useState('game');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8 space-x-2">
          <Crown className="w-8 h-8 text-yellow-400" />
          <h1 className="text-4xl font-bold text-center">Jogo de Stickers</h1>
        </div>
        
        {/* Tabs */}
        <div className="w-full flex flex-col items-center">
          <div className="flex bg-gray-800/50 rounded-lg p-1 border border-gray-700 mb-4">
            <button
              onClick={() => setActiveTab('game')}
              className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${
                activeTab === 'game'
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <Camera className="w-4 h-4 mr-2" />
              Jogo
            </button>
            <button
              onClick={() => setActiveTab('attempts')}
              className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${
                activeTab === 'attempts'
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <Crown className="w-4 h-4 mr-2" />
              Tentativas
            </button>
          </div>
          
          {/* Tab Content */}
          <div className="w-full">
            {activeTab === 'game' && (
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <Field/>
              </div>
            )}
            
            {activeTab === 'attempts' && (
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <Attempts />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
