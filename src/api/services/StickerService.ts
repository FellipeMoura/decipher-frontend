import { ISticker } from '../../types/Sticker';
import { Api } from '../axios-config';

export const StickerService = {
  findByTheme_Id: async (themeId: number): Promise<ISticker[] | Error> => {
    try {
     
      const { data } = await Api.get('/sticker/'+themeId);
      return data;
    } catch (error: any) {
      return new Error(error.message || 'Erro ao buscar os stickers.');
    }
  },
}
