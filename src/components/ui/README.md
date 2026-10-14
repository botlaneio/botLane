# BotLane UI

Our own components, built on [Base UI](https://base-ui.com) (MIT) for behaviour and
accessibility, and styled with the site tokens in `src/app/globals.css`
(dark grey `btn`, graphite violet `lane`, sizes in rem).

The visual direction is inspired by [Chord](https://github.com/dqnamo/Chord) by
[dqnamo](https://github.com/dqnamo). No Chord code is copied here: Chord has no licence yet.

| Component | File | Import |
| --- | --- | --- |
| Button | `button.tsx` | `import { Button } from "@/components/ui/button"` |
| Dialog | `dialog.tsx` | `import { Dialog, DialogContent, ... } from "@/components/ui/dialog"` |
| Toast | `toast.tsx` | `<Toaster />` once in a layout, then `toast.add({...})` anywhere |
| Select | `select.tsx` | `import { Select } from "@/components/ui/select"` |
| Tooltip | `tooltip.tsx` | `import { Tooltip } from "@/components/ui/tooltip"` |
| Tabs | `tabs.tsx` | `import { Tabs, TabsList, TabsTab, TabsPanel } from "@/components/ui/tabs"` |

Live preview: `/brand/ui` (not indexed, not linked from the site).
