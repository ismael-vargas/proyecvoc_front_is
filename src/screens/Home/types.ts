export type HomeProps = {
    title: string;
    subtitle: string;
    advice: string;
    features: string[];
  };
  
  export interface HomeState {
    title: string;
    subtitle: string;
    advice: string;
    features: string[];
    loading: boolean;
  }
  