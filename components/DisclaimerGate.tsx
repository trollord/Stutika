"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { DISCLAIMER_PARAGRAPHS, site } from "@/lib/content";
import { Logo } from "@/components/Wordmark";

const STORAGE_KEY = "obiter-disclaimer-accepted";
const EASE = [0.16, 1, 0.3, 1] as const;

type Stage = "prompt" | "declined" | "done";

/**
 * Whether this session has already acknowledged the notice.
 *
 * The blocking script in the root layout stamps `data-gate="done"` on <html>
 * before first paint, so the attribute is the authoritative client-side answer
 * and needs no re-subscription. The server always answers "not yet", which is
 * what makes the panel part of the server-rendered HTML for a first visit.
 */
const noSubscribe = () => () => {};
const readGate = () => document.documentElement.dataset.gate === "done";
const serverGate = () => false;

/**
 * Bar Council of India acknowledgement. Shown before any site content is
 * reachable and remembered for the browser session.
 */
export function DisclaimerGate() {
  const alreadyAccepted = useSyncExternalStore(
    noSubscribe,
    readGate,
    serverGate,
  );
  const [stage, setStage] = useState<Stage>("prompt");
  const still = useReducedMotion();
  const releaseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (alreadyAccepted) return null;

  const accept = () => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* private mode — the acknowledgement simply lasts for this page view */
    }
    setStage("done");
    // Release the scroll lock only once the curtain has finished wiping away.
    if (releaseTimer.current) clearTimeout(releaseTimer.current);
    releaseTimer.current = setTimeout(
      () => document.documentElement.setAttribute("data-gate", "done"),
      still ? 0 : 700,
    );
  };

  return (
    <AnimatePresence>
      {stage === "done" ? null : (
        <motion.div
          key="panel"
          className="gate"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gate-title"
          initial={false}
          exit={
            still ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)", opacity: 1 }
          }
          transition={{ duration: 0.75, ease: EASE }}
        >
          <div className="gate__panel">
            <aside className="gate__rail" aria-hidden="true">
              <span>00</span>
              <span className="u-label">Bar Council of India</span>
            </aside>

            <div className="gate__head">
              <Logo />
              <span className="u-label" id="gate-title">
                {stage === "declined" ? "Access Declined" : "Disclaimer"}
              </span>
            </div>

            {stage === "prompt" ? (
              <>
                <div className="gate__body">
                  {DISCLAIMER_PARAGRAPHS.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                  ))}
                </div>

                <div className="gate__actions">
                  <p className="gate__note">
                    Please confirm that you have read and accepted the above
                    disclaimer.
                  </p>
                  <button type="button" className="btn" onClick={accept}>
                    I Agree
                  </button>
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={() => setStage("declined")}
                  >
                    Decline
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="gate__body">
                  <p>
                    You have chosen not to accept the disclaimer. Access to this
                    website requires acknowledgement of the terms set out above.
                  </p>
                  <p>
                    If you wish to reach Obiter Legal directly, you are welcome
                    to write to{" "}
                    <a
                      href={`mailto:${site.email}`}
                      style={{
                        color: "var(--ink)",
                        textDecoration: "underline",
                        textUnderlineOffset: 4,
                      }}
                    >
                      {site.email}
                    </a>
                    .
                  </p>
                </div>
                <div className="gate__actions">
                  <p className="gate__note">
                    You may return to the disclaimer at any time.
                  </p>
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={() => setStage("prompt")}
                  >
                    Back to Disclaimer
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
