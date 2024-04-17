export abstract class TextPlugin {
  options: any;
  abstract transformText(text: string): string;
}
class UpperCasePlugin extends TextPlugin {
  transformText(text: string): string {
    return text.toUpperCase();
  }
}

export default UpperCasePlugin;
