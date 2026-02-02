export class Unique {
  static suffix(): string {
    const d = new Date();

    const pad2 = (n: number) => String(n).padStart(2, '0');

    const yyyy = d.getFullYear();
    const mm = pad2(d.getMonth() + 1);
    const dd = pad2(d.getDate());
    const hh = pad2(d.getHours());
    const mi = pad2(d.getMinutes());
    const ss = pad2(d.getSeconds());

    const rand = Math.random().toString(36).slice(2, 8);

    return `${yyyy}${mm}${dd}-${hh}${mi}${ss}-${rand}`;
  }

  static email(prefix: string = 'qa'): string {
    return `${prefix}+${Unique.suffix()}@example.com`;
  }
}
