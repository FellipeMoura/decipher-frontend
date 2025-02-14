import { ISticker } from '../../types/Sticker';
import { Api } from '../axios-config';

export const StickerService = {
  getAllByTheme: async (themeId: number): Promise<ISticker[] | Error> => {
    try {
     
      const { data } = await Api.get('/sticker/theme/'+themeId);
      return data;
    } catch (error: any) {
      return new Error(error.message || 'Erro ao buscar os stickers.');
    }
  },
}
