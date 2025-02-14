import { ITheme } from "./Theme";

export interface ISticker {
  id: number;
  name: string;
  url: string;
  theme: ITheme; // Associação com Theme
}