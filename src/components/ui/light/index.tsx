import s from "./light.module.scss";

export default function Light() {
  return (
    <div style={{ opacity: 0.7 }}>
      <div className={s.light} />
      <div className={s.light_center} />
      <div className={s.light_right} />
    </div>
  );
}
