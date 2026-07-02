/* global React, Icon */

const CAL_OPEN = 8;          // 08:00
const CAL_CLOSE = 19;        // 19:00 (last line)
const SLOT_H = 56;           // px per hour

const SERVICE_CLASS = {
  'Lavagem completa': 'completa',
  'Lavagem simples':  'simples',
  'Polimento técnico': 'polimento',
  'Polimento':        'polimento',
  'Higienização interna': 'estetica',
  'Estética interna': 'estetica',
  'Lavagem + cera':   'cera',
};

function WeekCalendar({ days, events }) {
  const hours = [];
  for (let h = CAL_OPEN; h < CAL_CLOSE; h++) hours.push(h);

  return (
    <div className="lv-cal-card">
      <div className="lv-cal-head">
        <div className="lv-cal-head__corner" />
        {days.map(d => (
          <div key={d.date} className={`lv-cal-dayhead ${d.today ? 'is-today' : ''}`}>
            <div className="lv-cal-dayhead__dow">{d.dow}</div>
            <div className="lv-cal-dayhead__date">{d.date}</div>
          </div>
        ))}
      </div>

      <div className="lv-cal-body">
        <div className="lv-cal-timecol">
          {hours.map(h => (
            <div key={h} className="lv-cal-time">{String(h).padStart(2, '0')}:00</div>
          ))}
        </div>

        {days.map((d, di) => (
          <div key={d.date} className={`lv-cal-col ${d.today ? 'is-today' : ''}`}>
            {hours.map(h => <div key={h} className="lv-cal-hourline" />)}
            {events.filter(e => e.day === di).map(e => {
              const top = (e.start - CAL_OPEN) * SLOT_H;
              const height = e.duration * SLOT_H - 4;
              const cls = SERVICE_CLASS[e.service] || 'simples';
              const endLabel = fmtHour(e.start + e.duration);
              return (
                <div key={e.id} className={`lv-event lv-event--${cls}`} style={{ top, height }}>
                  <div className="lv-event__service">{e.service}</div>
                  <div className="lv-event__meta">
                    <span className="lv-event__plate">{e.plate}</span>
                    <span>·</span>
                    <span>{fmtHour(e.start)}–{endLabel}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function fmtHour(v) {
  const h = Math.floor(v);
  const m = Math.round((v - h) * 60);
  return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');
}

window.WeekCalendar = WeekCalendar;
