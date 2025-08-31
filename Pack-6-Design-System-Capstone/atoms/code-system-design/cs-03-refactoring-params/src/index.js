export class EmailOptions{
  constructor({to, cc=[], bcc=[], subject, body=''} = {}){ this.to=to; this.cc=cc; this.bcc=bcc; this.subject=subject; this.body=body; }
  validate(){ if(!this.to || !this.subject) throw new Error('invalid'); }
}
export function sendEmail(opts){ const e=new EmailOptions(opts); e.validate(); return `sent:${e.to}:${e.subject}`; }
