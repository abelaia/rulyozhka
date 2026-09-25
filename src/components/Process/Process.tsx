import { PROCESS_STEPS as steps } from '../../constants/site';
import type { ProcessStep as ProcessStepType } from '../../constants/site';
import { useInView } from '../../hooks';
import './Process.scss';

export default function Process() {
  const { ref: headRef, inView: headInView } = useInView<HTMLDivElement>();
  const { ref: noteRef, inView: noteInView } = useInView<HTMLParagraphElement>();

  return (
    <section className="process section" id="process">
      <div className="container">
        <div className={`section-head reveal ${headInView ? 'is-visible' : ''}`} ref={headRef}>
          <div>
            <p className="section-head__overline">Формат работы</p>
            <h2 className="section-head__title">4 шага до нового салона</h2>
          </div>
        </div>

        <div className="process__grid">
          {steps.map((step, i) => (
            <ProcessStep key={step.index} step={step} delay={i * 90} />
          ))}
        </div>

        <p className={`process__note reveal ${noteInView ? 'is-visible' : ''}`} ref={noteRef}>
          Средний срок полной перетяжки салона от 5 дней.
        </p>
      </div>
    </section>
  );
}

function ProcessStep({ step, delay }: { step: ProcessStepType; delay: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      className={`process__step reveal ${inView ? 'is-visible' : ''}`}
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="process__step-index">{step.index}</span>
      <h3 className="process__step-title">{step.title}</h3>
      <p className="process__step-text">{step.text}</p>
    </div>
  );
}
