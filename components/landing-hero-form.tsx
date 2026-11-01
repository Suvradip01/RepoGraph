"use client";

import { useActionState } from "react";
import { submitFromLanding, type LandingFormState } from "@/app/landing-actions";

const INITIAL: LandingFormState = { error: null };

export function LandingHeroForm() {
  const [state, action, pending] = useActionState(submitFromLanding, INITIAL);

  return (
    <form action={action} className="landing-form">
      <div className="landing-form-row">
        <input
          name="url"
          required
          autoComplete="off"
          spellCheck={false}
          placeholder="github.com/owner/repo"
          aria-label="Public GitHub repository URL"
          aria-invalid={state.error ? true : undefined}
          className="landing-form-input"
        />
        <button
          type="submit"
          disabled={pending}
          className="landing-form-button"
        >
          {pending ? "Mapping…" : "Map repository"}
        </button>
      </div>
      {state.error && (
        <p role="alert" className="landing-form-error">
          {state.error}
        </p>
      )}
      <p className="landing-form-caption">
        Public repositories only. You sign in first; no GitHub token is asked for.
      </p>
      <style>{CSS}</style>
    </form>
  );
}

const CSS = `
  .landing-form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
  }

  .landing-form-row {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    width: 100%;
  }

  .landing-form-input {
    height: 2.75rem;
    flex: 1;
    min-width: 0;
    border-radius: 0.375rem;
    border: 1px solid var(--line);
    background: var(--surface);
    padding: 0 0.875rem;
    font-family: var(--font-mono), monospace;
    font-size: 0.8125rem;
    color: var(--fg);
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
  }

  .landing-form-input::placeholder {
    color: var(--fg-muted);
    opacity: 0.65;
  }

  .landing-form-input:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
  }

  .landing-form-button {
    height: 2.75rem;
    padding: 0 1.25rem;
    border-radius: 0.375rem;
    background: #3b82f6;
    color: #ffffff;
    font-size: 0.8125rem;
    font-weight: 500;
    cursor: pointer;
    border: none;
    white-space: nowrap;
    transition: background-color 0.15s, opacity 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }

  .landing-form-button:hover:not(:disabled) {
    background: #2563eb;
  }

  .landing-form-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .landing-form-caption {
    font-size: 0.75rem;
    color: var(--fg-muted);
    line-height: 1.4;
    margin: 0;
  }

  .landing-form-error {
    font-size: 0.75rem;
    color: #ef4444;
    margin: 0;
  }

  @media (max-width: 520px) {
    .landing-form-row {
      flex-direction: column;
      align-items: stretch;
    }
  }
`;
