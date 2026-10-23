"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { inr } from "@/lib/format";
import Avatar from "@/components/Avatar";
import UserForm from "@/components/UserForm";

export default function ProfilePage() {
  const { ready, user, orders, saveUser } = useStore();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!ready) return <div className="container section">Loading…</div>;

  if (!user)
    return (
      <div className="container section center">
        <h1>No profile yet</h1>
        <p className="muted">Your profile is created when you place your first order.</p>
        <Link href="/#collection" className="btn">Start shopping</Link>
      </div>
    );

  return (
    <div className="container section narrow">
      <div className="profile-head">
        <Avatar name={user.name} size={110} />
        <div>
          <h1>{user.name}</h1>
          <p className="muted">{user.phone}{user.email ? ` · ${user.email}` : ""}</p>
        </div>
      </div>

      {saved && !editing && <p className="success">Profile updated ✓</p>}

      <div className="panel">
        {editing ? (
          <UserForm
            initial={user}
            submitLabel="Save changes"
            onSubmit={(u) => {
              saveUser(u);
              setEditing(false);
              setSaved(true);
            }}
            onCancel={() => setEditing(false)}
          />
        ) : (
          <>
            <h3>Delivery details</h3>
            <p>{user.address}</p>
            <p className="muted">{user.city} - {user.pincode}</p>
            <button
              className="btn btn-ghost"
              onClick={() => {
                setSaved(false);
                setEditing(true);
              }}
            >
              Edit profile
            </button>
          </>
        )}
      </div>

      <h2>Your orders</h2>
      {orders.length === 0 && <p className="muted">No orders yet.</p>}
      {orders.map((o) => (
        <div key={o.id} className="panel">
          <div className="order-head">
            <strong>{o.id}</strong>
            <span className="muted small">{new Date(o.date).toLocaleDateString("en-IN")}</span>
          </div>
          {o.items.map((i, idx) => (
            <p key={idx} className="small">{i.qty} × {i.name} — {inr(i.price * i.qty)}</p>
          ))}
          <p><strong>Total: {inr(o.total)}</strong></p>
        </div>
      ))}
    </div>
  );
}