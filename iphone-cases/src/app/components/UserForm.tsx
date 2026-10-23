"use client";

import { FormEvent, useState } from "react";
import { User } from "@/types";

type Errors = Partial<Record<keyof User, string>>;

const empty: User = { name: "", phone: "", email: "", address: "", city: "", pincode: "" };

function validate(v: User): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Enter your full name";
  if (!/^[6-9]\d{9}$/.test(v.phone)) e.phone = "Enter a valid 10-digit mobile number";
  if (v.email && !/^\S+@\S+\.\S+$/.test(v.email)) e.email = "Enter a valid email or leave it empty";
  if (v.address.trim().length < 8) e.address = "Enter your full address";
  if (v.city.trim().length < 2) e.city = "Enter your city";
  if (!/^\d{6}$/.test(v.pincode)) e.pincode = "Enter a 6-digit pincode";
  return e;
}

interface Props {
  initial?: User | null;
  submitLabel: string;
  onSubmit: (u: User) => void;
  onCancel?: () => void;
}

export default function UserForm({ initial, submitLabel, onSubmit, onCancel }: Props) {
  const [values, setValues] = useState<User>(initial ?? empty);
  const [errors, setErrors] = useState<Errors>({});

  const set = (k: keyof User) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const clean: User = {
      ...values,
      name: values.name.trim(),
      phone: values.phone.trim(),
      email: values.email?.trim() || undefined,
      address: values.address.trim(),
      city: values.city.trim(),
      pincode: values.pincode.trim(),
    };
    const errs = validate(clean);
    setErrors(errs);
    if (Object.keys(errs).length === 0) onSubmit(clean);
  };

  return (
    <form className="form" onSubmit={submit} noValidate>
      <label>
        Full name
        <input value={values.name} onChange={set("name")} placeholder="Your name" />
        {errors.name && <span className="error">{errors.name}</span>}
      </label>

      <div className="row">
        <label>
          Mobile number
          <input value={values.phone} onChange={set("phone")} inputMode="numeric" maxLength={10} placeholder="10-digit number" />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </label>
        <label>
          Email <em className="muted">(optional)</em>
          <input value={values.email ?? ""} onChange={set("email")} type="email" placeholder="you@example.com" />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>
      </div>

      <label>
        Full address
        <textarea value={values.address} onChange={set("address")} rows={3} placeholder="House no., street, area, landmark" />
        {errors.address && <span className="error">{errors.address}</span>}
      </label>

      <div className="row">
        <label>
          City
          <input value={values.city} onChange={set("city")} />
          {errors.city && <span className="error">{errors.city}</span>}
        </label>
        <label>
          Pincode
          <input value={values.pincode} onChange={set("pincode")} inputMode="numeric" maxLength={6} />
          {errors.pincode && <span className="error">{errors.pincode}</span>}
        </label>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn">{submitLabel}</button>
        {onCancel && (
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}