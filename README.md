# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


<!-- Testing -->





You said:
I'm creating a google sheet to track my Stocks portfolio, Now here I want to connect it with the psx data. Where I want my sheet to be connected with psx portal. If there is any dividend report which mentions an ex-date for my portfolio and I hold that stock on the ex-date which means my table should be populated with the dividend or bonus whatever was announced. I hope you understood what I want to say. Is this possible? If yes, Provide me step to step guide. Each Sheet, Table, Formula, Code, deployment, Data gathering/Scraping. Each and everything in easy steps.

ChatGPT said:
I’m checking how PSX publishes dividend and bonus announcements so I can give you a workflow that matches what actually exists on their portal today, not a generic stock-sheet setup.

I found the two official sources that matter most for your setup: PSX Data Portal “Payouts” for dividend/bonus/right-share announcements and PSX company/financial announcement pages for the detailed records tied to each company. I’m now checking the safest way to turn that into a Google Sheets workflow without depending on fragile assumptions.

Thought for 2m 28s
Yes — this is possible, but only if your sheet keeps a proper transaction ledger. Google Sheets cannot know whether you held a stock on the entitlement date unless you record every buy and sell with dates. The official PSX sources you can build around today are the PSX Data Portal “Payouts” page, which lists payout announcements and book-closure dates, and the PSX Financial Announcements page, which includes the “Dividend / Bonus / Right” field plus “Closure Of Share Transfer Books.” 

The key logic is this: for an announced payout, you check whether you held the stock on the entitlement date. In official PSX announcement letters, companies commonly state that the entitlement will be paid to shareholders whose names appear in the register on a stated date, and the share transfer books then close from the next date onward; one official 2026 example says shareholders on April 16, 2026 were entitled, while the book closure started April 17, 2026. 

So the system you want is:

Transactions sheet → your buys and sells.

Watchlist / Symbol master → your portfolio symbols and company names.

PSX import sheet → pulls official PSX announcement data.

Normalized actions sheet → cleans dividend / bonus / right rows.

Entitlements sheet → checks whether you held shares on the entitlement date and calculates dividend / bonus / right values.

Optional trigger → refreshes every day. 

First: important caution
PSX’s website terms say unauthorized commercial use and systematic retrieval of market data is prohibited, and PSX’s disclaimer also says the site does not guarantee timeliness, accuracy, or completeness. So for a personal tracker this setup is fine as an informational workflow, but if you want to redistribute data, run it at scale, or commercialize it, you should get permission or a proper data license from PSX. 

Best approach
I recommend a 2-layer setup:

Layer 1 — no-code connection
Use IMPORTHTML from the official PSX financial announcements page first, because it is simpler and more stable than building a scraper from scratch. The official page exposes a table with columns including Company, Dividend / Bonus / Right, and Closure Of Share Transfer Books. 

Layer 2 — Apps Script automation
Use Google Apps Script to:

normalize the imported action text,

compute entitlement date,

calculate shares held on that date,

populate dividend / bonus / rights rows automatically.

That gives you a working sheet without depending entirely on fragile scraping.

Sheet structure
Create these sheets in this exact order.

1) Transactions
This is the most important sheet.

Use these columns:

A	B	C	D	E	F	G
Trade Date	Symbol	Side	Qty	Price	Charges	Notes
Rules:

Trade Date must be a real date

Symbol like EFERT, FFC, POL

Side must be BUY or SELL

Qty always positive

Example:

Trade Date	Symbol	Side	Qty	Price	Charges	Notes
2026-01-10	EFERT	BUY	1000	155.20	650	Initial buy
2026-02-05	FFC	BUY	500	410.00	400	Swing
2026-03-01	EFERT	SELL	200	162.00	250	Partial exit
2) Symbols
Use this to map your PSX symbols to company names and face value.

A	B	C	D
Symbol	Company Name	Face Value	Tax Rate
Example:

Symbol	Company Name	Face Value	Tax Rate
EFERT	Engro Fertilizers Limited	10	0.15
FFC	Fauji Fertilizer Company Limited	10	0.15
POL	Pakistan Oilfields Limited	10	0.15
Why this sheet matters:

the official PSX financial-announcement table is company-name based,

dividend percentages are usually applied to face value,

tax rate lets you calculate net cash dividend.
PSX’s investor guide notes dividends can be cash dividends or bonus shares, and PSX’s pricing methodology documents corporate-action adjustments for dividend, bonus, and right issues. 

3) PSX_Import
In cell A1, paste:

=IMPORTHTML("https://www.psx.com.pk/psx/announcement/financial-announcements","table",1)
This should pull the official financial-announcement table from PSX. That page includes the fields you need: Company, Dividend / Bonus / Right, and Closure Of Share Transfer Books. 

If this works in your sheet, great — you do not need a custom scraper yet.

4) Portfolio
This gives current quantity by symbol.

A1:B1
Symbol | Current Qty
A2
=SORT(UNIQUE(FILTER(Transactions!B2:B,Transactions!B2:B<>"")))
B2
=ARRAYFORMULA(IF(A2:A="","",
  SUMIFS(Transactions!D:D,Transactions!B:B,A2:A,Transactions!C:C,"BUY")
 -SUMIFS(Transactions!D:D,Transactions!B:B,A2:A,Transactions!C:C,"SELL")
))
5) Actions_Normalized
This is the cleaned corporate-actions table.

Use columns:

A	B	C	D	E	F	G	H	I	J
Company Name	Symbol	Action Text	Action Type	Percent	Book Close Start	Book Close End	Entitlement Date	Source	Status
Here:

Action Type = D, B, or R

Percent = 35, 20, 100, etc.

Entitlement Date = previous trading day before book-closure start, unless the company PDF states a different record/entitlement date. Official PSX examples show entitlement tied to the register date immediately before book closure. 

6) Entitlements
This is your final output.

Use columns:

A	B	C	D	E	F	G	H	I	J
Symbol	Entitlement Date	Action Type	Percent	Held Qty	Gross Cash Div	Tax	Net Cash Div	Bonus/Right Shares	Source
The formulas you need
A. Shares held on a given entitlement date
In Entitlements!E2:

=IF(A2="","",
  SUMIFS(Transactions!$D:$D,Transactions!$B:$B,$A2,Transactions!$A:$A,"<="&$B2,Transactions!$C:$C,"BUY")
 -SUMIFS(Transactions!$D:$D,Transactions!$B:$B,$A2,Transactions!$A:$A,"<="&$B2,Transactions!$C:$C,"SELL")
)
This is the core of the whole system: it reconstructs your position as of the entitlement date.

B. Gross cash dividend
In Entitlements!F2:

=IF(C2<>"D",0,E2*XLOOKUP(A2,Symbols!A:A,Symbols!C:C,10)*D2/100)
Why this works:

PSX payout percentages are generally quoted on face value,

so 35% on a Rs 10 face-value share = Rs 3.50 per share.
An official PSX example explicitly states a final cash dividend of Rs. 3.50 per share i.e. 35%. 

C. Dividend tax
In Entitlements!G2:

=IF(C2<>"D",0,F2*XLOOKUP(A2,Symbols!A:A,Symbols!D:D,0))
D. Net cash dividend
In Entitlements!H2:

=F2-G2
E. Bonus or right shares
In Entitlements!I2:

=IF(OR(C2="B",C2="R"),E2*D2/100,0)
That gives:

20% bonus on 1,000 held shares = 200 extra shares

15% right on 1,000 held shares = 150 right entitlement shares

Apps Script setup
Now the automation part.

Go to:

Extensions → Apps Script

Delete the default code and paste this.

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('PSX Tools')
    .addItem('Rebuild Actions', 'rebuildActionsFromImport')
    .addItem('Rebuild Entitlements', 'rebuildEntitlements')
    .addItem('Run All', 'runAllPSX')
    .addToUi();
}

function runAllPSX() {
  rebuildActionsFromImport();
  rebuildEntitlements();
}

function rebuildActionsFromImport() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const importSheet = ss.getSheetByName('PSX_Import');
  const symbolsSheet = ss.getSheetByName('Symbols');
  const outSheet = ss.getSheetByName('Actions_Normalized') || ss.insertSheet('Actions_Normalized');

  const importData = importSheet.getDataRange().getValues();
  const symbolData = symbolsSheet.getDataRange().getValues();

  outSheet.clearContents();
  outSheet.appendRow([
    'Company Name','Symbol','Action Text','Action Type','Percent',
    'Book Close Start','Book Close End','Entitlement Date','Source','Status'
  ]);

  if (importData.length < 2) return;

  // Build company-name map
  const companyMap = {};
  for (let i = 1; i < symbolData.length; i++) {
    const symbol = String(symbolData[i][0] || '').trim();
    const company = String(symbolData[i][1] || '').trim().toLowerCase();
    if (symbol && company) companyMap[company] = symbol;
  }

  // Detect columns from header row
  const header = importData[0].map(x => String(x).trim().toLowerCase());

  const companyCol = header.findIndex(h => h.includes('company'));
  const actionCol  = header.findIndex(h => h.includes('dividend') || h.includes('bonus') || h.includes('right'));
  const closureCol = header.findIndex(h => h.includes('closure'));

  if (companyCol === -1 || actionCol === -1 || closureCol === -1) {
    throw new Error('Could not detect required columns in PSX_Import sheet.');
  }

  const rowsOut = [];

  for (let i = 1; i < importData.length; i++) {
    const row = importData[i];
    const companyName = String(row[companyCol] || '').trim();
    const actionText = String(row[actionCol] || '').trim();
    const closureText = String(row[closureCol] || '').trim();

    if (!companyName || !actionText || actionText === '-') continue;

    const symbol = companyMap[companyName.toLowerCase()] || '';

    // Examples: "35%(F) (D)" or "20%(i) (D)" or "15%(B)" etc.
    const percentMatch = actionText.match(/(\d+(\.\d+)?)\s*%/i);
    const typeMatch = actionText.match(/\(([DBR])\)\s*$/i) || actionText.match(/\(([DBR])\)/i);

    const percent = percentMatch ? parseFloat(percentMatch[1]) : '';
    const actionType = typeMatch ? typeMatch[1].toUpperCase() : '';

    // Examples: "17/04/2026 - 21/04/2026"
    let startDate = '';
    let endDate = '';
    let entitlementDate = '';

    const closureMatch = closureText.match(/(\d{2}\/\d{2}\/\d{4})\s*-\s*(\d{2}\/\d{2}\/\d{4})/);
    if (closureMatch) {
      startDate = parseDdMmYyyy(closureMatch[1]);
      endDate = parseDdMmYyyy(closureMatch[2]);
      entitlementDate = previousBusinessDay(startDate);
    }

    rowsOut.push([
      companyName,
      symbol,
      actionText,
      actionType,
      percent,
      startDate,
      endDate,
      entitlementDate,
      'https://www.psx.com.pk/psx/announcement/financial-announcements',
      symbol ? 'OK' : 'Map Symbol'
    ]);
  }

  if (rowsOut.length) {
    outSheet.getRange(2, 1, rowsOut.length, rowsOut[0].length).setValues(rowsOut);
    outSheet.getRange(2, 6, rowsOut.length, 3).setNumberFormat('yyyy-mm-dd');
  }
}

function rebuildEntitlements() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const txSheet = ss.getSheetByName('Transactions');
  const symSheet = ss.getSheetByName('Symbols');
  const actSheet = ss.getSheetByName('Actions_Normalized');
  const outSheet = ss.getSheetByName('Entitlements') || ss.insertSheet('Entitlements');

  const tx = txSheet.getDataRange().getValues();
  const syms = symSheet.getDataRange().getValues();
  const acts = actSheet.getDataRange().getValues();

  outSheet.clearContents();
  outSheet.appendRow([
    'Symbol','Entitlement Date','Action Type','Percent','Held Qty',
    'Gross Cash Div','Tax','Net Cash Div','Bonus/Right Shares','Source'
  ]);

  // Build face value and tax map
  const symMap = {};
  for (let i = 1; i < syms.length; i++) {
    const symbol = String(syms[i][0] || '').trim();
    if (!symbol) continue;
    symMap[symbol] = {
      faceValue: Number(syms[i][2] || 10),
      taxRate: Number(syms[i][3] || 0)
    };
  }

  // Normalize transactions
  const transactions = [];
  for (let i = 1; i < tx.length; i++) {
    const d = tx[i][0];
    const symbol = String(tx[i][1] || '').trim();
    const side = String(tx[i][2] || '').trim().toUpperCase();
    const qty = Number(tx[i][3] || 0);

    if (!d || !symbol || !side || !qty) continue;

    transactions.push({
      date: new Date(d),
      symbol,
      side,
      qty
    });
  }

  const out = [];

  for (let i = 1; i < acts.length; i++) {
    const symbol = String(acts[i][1] || '').trim();
    const actionType = String(acts[i][3] || '').trim();
    const percent = Number(acts[i][4] || 0);
    const entitlementDate = acts[i][7];
    const source = String(acts[i][8] || '').trim();

    if (!symbol || !actionType || !percent || !entitlementDate) continue;

    const entDate = new Date(entitlementDate);

    let heldQty = 0;
    transactions.forEach(t => {
      if (t.symbol === symbol && t.date <= entDate) {
        heldQty += (t.side === 'BUY' ? t.qty : -t.qty);
      }
    });

    if (heldQty <= 0) continue;

    const faceValue = (symMap[symbol] && symMap[symbol].faceValue) || 10;
    const taxRate = (symMap[symbol] && symMap[symbol].taxRate) || 0;

    let grossCashDiv = 0;
    let tax = 0;
    let netCashDiv = 0;
    let bonusOrRightShares = 0;

    if (actionType === 'D') {
      grossCashDiv = heldQty * faceValue * percent / 100;
      tax = grossCashDiv * taxRate;
      netCashDiv = grossCashDiv - tax;
    } else if (actionType === 'B' || actionType === 'R') {
      bonusOrRightShares = heldQty * percent / 100;
    }

    out.push([
      symbol, entDate, actionType, percent, heldQty,
      grossCashDiv, tax, netCashDiv, bonusOrRightShares, source
    ]);
  }

  if (out.length) {
    outSheet.getRange(2, 1, out.length, out[0].length).setValues(out);
    outSheet.getRange(2, 2, out.length, 1).setNumberFormat('yyyy-mm-dd');
  }
}

function parseDdMmYyyy(s) {
  const [dd, mm, yyyy] = s.split('/').map(Number);
  return new Date(yyyy, mm - 1, dd);
}

function previousBusinessDay(d) {
  const dt = new Date(d);
  dt.setDate(dt.getDate() - 1);

  // Simple weekend logic; adjust later if you want PSX-holiday support
  while (dt.getDay() === 0 || dt.getDay() === 6) {
    dt.setDate(dt.getDate() - 1);
  }
  return dt;
}
What this script does
It does two jobs:

rebuildActionsFromImport()
reads the official PSX_Import table,

detects the company/action/book-closure columns,

extracts:

company name,

payout text,

type D/B/R,

percent,

book closure range,

entitlement date,

writes clean rows to Actions_Normalized.

rebuildEntitlements()
reads your Transactions,

checks how many shares you held on the entitlement date,

calculates:

cash dividend,

tax,

net cash,

bonus/right shares,

writes only rows where you actually held the stock.

How to deploy it
You do not need a web app deployment.

Just do this:

Step 1
Open Extensions → Apps Script

Step 2
Paste the code

Step 3
Save project with a name like PSX Portfolio Tools

Step 4
Run runAllPSX() once manually

Google will ask for authorization because the script reads and writes your spreadsheet.

Step 5
Refresh the sheet

You will see a custom menu: PSX Tools

Automatic refresh
To keep it updated daily:

In Apps Script, click Triggers

Add trigger

Choose function: runAllPSX

Event source: Time-driven

Type: Day timer

Pick once or twice daily

Because PSX’s own site warns against unauthorized/systematic retrieval and does not guarantee data completeness, keep the refresh modest — for example once daily or twice daily, not every few minutes. 

How “ex-date” should work in your model
This is the cleanest practical rule:

Use:
Entitlement Date = previous trading/business day before book-closure start

Why:

PSX financial announcements show the closure of share transfer books field,

official company announcements commonly say the entitlement is for shareholders whose names appear in the register on the day immediately before closure starts,

transfers received by the close of business on that date are treated in time. 

So if the closure is:

17/04/2026 - 21/04/2026
then the entitlement date is normally:

16/04/2026
If that day is a weekend or market holiday, use the previous trading day. For perfect accuracy, add a small Calendar sheet of PSX holidays and replace the simple weekend rule with holiday-aware logic.

Optional Calendar sheet for holiday-aware ex-date
Create a Calendar sheet:

A
Holiday Date
Example:

Holiday Date
2026-03-23
2026-05-01
Then update previousBusinessDay() later to skip those dates too.

Bonus shares and right shares: best practice
Your entitlement sheet should show them as pending entitlements first.

Do not immediately add bonus/right shares into Transactions on announcement day.

Instead:

keep them in Entitlements,

once they are actually credited / allotted, then post a new line in Transactions.

That way your portfolio history stays clean.

If IMPORTHTML fails
Sometimes official sites change markup.

If IMPORTHTML stops working, your fallback options are:

Option 1 — manual paste from official PSX page
Keep using the same Apps Script, but paste the latest PSX financial-announcement table into PSX_Import.

Option 2 — build a direct scraper
Possible, but more fragile, because PSX Data Portal pages and layouts may change, and PSX terms also restrict certain automated retrieval patterns. 

For most personal portfolios, IMPORTHTML + Apps Script normalization is the sweet spot.

What you will get in the end
Once set up, your sheet will do this automatically:

you add trades in Transactions

PSX data comes into PSX_Import

script normalizes new dividends / bonuses / rights

Entitlements checks whether you held the stock on entitlement date

if yes, it auto-populates:

gross dividend,

tax,

net dividend,

bonus shares,

right shares

That is exactly the workflow you described.

My recommendation
Build it in this order:

Transactions

Symbols

PSX_Import

test IMPORTHTML

add Apps Script

run runAllPSX()

add daily trigger

If you want, I can turn this into a ready-to-paste Google Sheets template layout with exact cell-by-cell formulas for every sheet.


You said:
Okay I liked the method. Now instead of all information at once. Give me first step. I'll do it and let you know. Then second and so on. Also explain formulas but be concise. No extra headings or details for explaination.

ChatGPT said:
Great — we’ll build this step by step.

Step 1: Create your Transactions sheet (foundation)
Create a new Google Sheet and rename the first tab to:

Transactions
Add these columns (Row 1):
A: Trade Date  
B: Symbol  
C: Side  
D: Qty  
E: Price  
F: Charges  
G: Notes
Enter 3–5 sample rows (important)
Example:

Trade Date	Symbol	Side	Qty	Price	Charges	Notes
2026-01-10	EFERT	BUY	1000	155.20	650	Initial
2026-02-05	FFC	BUY	500	410.00	400	
2026-03-01	EFERT	SELL	200	162.00	250	
Add data validation (important)
Select column C (Side) → Data → Data validation:

Allow only:

BUY, SELL
Why this step matters (very short)
Later formula will do:

Shares held = buys before date − sells before date
Without this sheet, nothing else works.

Do this and tell me when ready.
Then we’ll move to Step 2 (Symbols sheet + mapping).


You said:
Yes, Its done. I changes the Column side to Type as its more suitable. Secondly allow functionality of Partial selling. And make sure Holdings should have all the stocks that is currenly in my portfolio. 

ChatGPT said:
Thought for a couple of seconds
Perfect. Type is fine instead of Side.

And yes, partial selling already works with this structure.

Example:

Buy 1,000 EFERT

Sell 200 EFERT

Holding becomes 800

Because later we will use a formula like:

Total Holding = total BUY qty - total SELL qty
So as long as every sell is entered as a separate row with the sold quantity, partial selling is handled automatically.

Also yes — we will make a Holdings sheet that shows all stocks currently in your portfolio, meaning only symbols whose net quantity is greater than 0.

Now do Step 2.

Rename or create a new tab:

Symbols
Add these columns in row 1:

A: Symbol
B: Company Name
C: Face Value
D: Tax Rate
Add your current portfolio stocks here, one row per stock.

Example:

Symbol	Company Name	Face Value	Tax Rate
EFERT	Engro Fertilizers Limited	10	0.15
FFC	Fauji Fertilizer Company Limited	10	0.15
POL	Pakistan Oilfields Limited	10	0.15
Very short explanation:

Symbol matches your trades

Company Name helps match PSX announcement data

Face Value is used for dividend calculation

Tax Rate is used for net dividend

Dividend formula later will be:

Dividend = Held Qty × Face Value × Dividend %
Example:
If held qty = 1,000, face value = 10, dividend = 35%

= 1000 × 10 × 35%
= 3500
Complete this sheet with your portfolio stocks and tell me once done. Then I’ll give you the Holdings sheet next.


You said:
Proceed to next step.

ChatGPT said:
Good. Now we build your Holdings sheet (current portfolio).

Step 3: Create Holdings sheet
Create a new tab:

Holdings
Add headers:
A: Symbol  
B: Current Qty
A2 (list all symbols from transactions)
Paste this in A2:

=SORT(UNIQUE(FILTER(Transactions!B2:B, Transactions!B2:B<>"")))
Explanation (short):

FILTER → removes blanks

UNIQUE → keeps one of each symbol

SORT → clean ordering

B2 (calculate current holdings)
Paste this in B2:

=ARRAYFORMULA(IF(A2:A="","",
  SUMIFS(Transactions!D:D,Transactions!B:B,A2:A,Transactions!C:C,"BUY")
 -SUMIFS(Transactions!D:D,Transactions!B:B,A2:A,Transactions!C:C,"SELL")
))
(works even if your column is named Type instead of Side)

Explanation (short):

First SUMIFS → total BUY qty

Second SUMIFS → total SELL qty

Result → net holding

Show only active holdings (important)
Right now it will also show zero/negative.

Add this in D1 (optional clean table):

Active Holdings
In D2:

=FILTER(A2:B, B2:B>0)
Explanation:

Keeps only stocks where you still hold shares

What you should see
All symbols automatically listed

Correct quantities after partial sells

Active holdings separated cleanly

Do this and confirm.
Next step → we connect PSX data (live import) 🔥


You said:

SORT(UNIQUE(FILTER(Transactions!B2:B, Transactions!B2:B<>""))

Explain a bit more.

ChatGPT said:
Thought for 5s
Sure.

For this formula:

=SORT(UNIQUE(FILTER(Transactions!B2:B, Transactions!B2:B<>"")))
Read it from inside to outside:

Transactions!B2:B
This means: take all values from column B in Transactions, starting from row 2.
In your sheet, column B is your Symbol column.

So if your symbols are like this:

EFERT
FFC
EFERT
POL
FFC
then this part is simply reading that full list.

Next part:

FILTER(Transactions!B2:B, Transactions!B2:B<>"")
This removes blank cells.

Why needed:
if you leave many empty rows below your trades, Google Sheets still sees the whole column range.
So FILTER(..., <> "") keeps only non-empty symbols.

Example:

Before filter:

EFERT
FFC
EFERT

POL


FFC
After filter:

EFERT
FFC
EFERT
POL
FFC
Next part:

UNIQUE(...)
This removes duplicates.

So:

Before:

EFERT
FFC
EFERT
POL
FFC
After:

EFERT
FFC
POL
It keeps one copy of each symbol.

Last part:

SORT(...)
This sorts the final unique list alphabetically.

So:

Before sort:

FFC
POL
EFERT
After sort:

EFERT
FFC
POL
So the full formula does this:

take all symbols from Transactions

remove blanks

remove duplicates

sort them

That is why column A in Holdings becomes your stock list automatically.

One important note:
this formula shows all symbols ever traded, not only currently held ones.

That is why we use this second formula later:

=FILTER(A2:B, B2:B>0)
Because:

column A = all symbols found

column B = net quantity

B2:B>0 keeps only stocks you still hold

Example:

Symbol	Current Qty
EFERT	800
FFC	0
POL	300
After filter:

Symbol	Current Qty
EFERT	800
POL	300
If you want, I can now explain the B2 holding formula the same way, piece by piece.


You said:
Uploaded image
Uploaded image
This is what my Holding formula is and it's priting 800 for both stocks. I'm using Structured style and yes Google now supports this style. So next time give me this structured  formulas.

ChatGPT said:
Got it — and yes, structured references are perfectly fine 👍

Your issue is here:

SUMIFS(Transactions[Qty], Transactions[Symbol], Holdings[Symbol], ...)
❌ Problem
Holdings[Symbol] is a column, but SUMIFS needs a single value per row.

So it’s matching incorrectly → giving same result (800) for all rows.

✅ Fix (structured formula)
Use [@Symbol] (current row value) instead of full column:

=ARRAYFORMULA(IF(Holdings[Symbol]="","",
  SUMIFS(Transactions[Qty], Transactions[Symbol], Holdings[@Symbol], Transactions[Type], "BUY")
 -SUMIFS(Transactions[Qty], Transactions[Symbol], Holdings[@Symbol], Transactions[Type], "SELL")
))
⚠️ But important (ARRAYFORMULA + structured refs)
Structured refs like [@Symbol] are row-based, while ARRAYFORMULA is column-based.

👉 Mixing both can behave unpredictably.

✅ Best practice (clean & correct)
Instead of ARRAYFORMULA, just put this in C4 (or first row of Current Qty column):

=IF([@Symbol]="","",
  SUMIFS(Transactions[Qty], Transactions[Symbol], [@Symbol], Transactions[Type], "BUY")
 -SUMIFS(Transactions[Qty], Transactions[Symbol], [@Symbol], Transactions[Type], "SELL")
)
Then let the table auto-fill.

Why your result was same (800)
Because this part:

Transactions[Symbol], Holdings[Symbol]
means:

compare entire column vs entire column

Sheets collapses it → gives same aggregate result

Expected output now
Symbol	Current Qty
EFERT	800
FFC	500
Fix this and confirm.
Next step → connecting PSX live data (this is where things get interesting) 🚀


You said:
There formulas you gave are returning error. Previously that I showed you was not giving error.

ChatGPT said:
Thought for 21s
You’re right. The error was from my formula, not your sheet.

Google Sheets does support table references, but the official syntax page also says #This Row is not currently supported. So Excel-style current-row references like [@Symbol] are the part that breaks here. 

Use this in the first data row of Current Qty:

=IF(B4="","",
  SUMIFS(Transactions[Qty], Transactions[Symbol], B4, Transactions[Type], "BUY")
 -SUMIFS(Transactions[Qty], Transactions[Symbol], B4, Transactions[Type], "SELL")
)
Why this works:

Transactions[Qty] = sum column

Transactions[Symbol] = symbol match column

B4 = the symbol in the current Holdings row

first SUMIFS adds all buys for that symbol

second SUMIFS subtracts all sells for that symbol

With your sample data:

EFERT = 1000 - 200 = 800

FFC = 500 - 0 = 500

So your result should be:

Symbol	Current Qty
EFERT	800
FFC	500
One more important thing: Google’s help page shows table references like Table1[Column 1] and says to use ARRAYFORMULA for retrieving an entire table or column, but since there is no supported “this row” table reference, this particular calculation is safest as a row formula copied down / auto-filled by the table, not as one big array formula. 

So from now on, I’ll give you:

structured references where Google Sheets actually supports them

normal row cell references where current-row table syntax is not supported

Put that formula in your first Current Qty row and check whether EFERT shows 800 and FFC shows 500. Then I’ll give you the next step in the same style.


You said:
Uploaded image
It worked and what next?

ChatGPT said:
Thought for 7s
Great. Next step is to pull the PSX announcement table into a new sheet. The official PSX Financial Announcements page includes the columns we need later, especially Company, Dividend / Bonus / Right, and Closure Of Share Transfer Books.

Create a new tab named:

PSX_Import
In cell A1, paste this:

=IMPORTHTML("https://www.psx.com.pk/psx/announcement/financial-announcements","table",1)
What this does:

IMPORTHTML pulls a table from a webpage

first argument = page URL

"table" tells Sheets to import a table, not a list

1 means the first table found on that page

After a few seconds, you should see a full PSX table appear. That page is the correct official source to start from.

Check these three columns are present somewhere in the imported table:

Company

Dividend / Bonus / Right

Closure Of Share Transfer Books

If the formula gives an error or wrong table, try this instead:

=IMPORTHTML("https://www.psx.com.pk/psx/announcement/financial-announcements","table",2)
Reason: sometimes a page has more than one HTML table, and the announcements table may not be table 1. The PSX page structure can expose multiple tables depending on how Google Sheets reads the page.

Once it loads, tell me:

whether table 1 worked or table 2 worked

whether those 3 columns are visible

Then I’ll give you the next step: cleaning that import into a usable Actions table.


You said:
Yes It worked. Before going to the next step, It returns me a lot of entries. How long this data is and daily fetching it once or twice modify the same data or adds new each time?

ChatGPT said:
Good question — this is important to understand before we go further.

1. How much data are you getting?
IMPORTHTML pulls whatever is currently visible on that PSX page.

That page typically shows:

recent announcements (not entire history)

usually last few weeks / months

sometimes paginated (but Sheets only grabs the visible table)

👉 So:

You are not getting full historical data

You are getting a rolling latest dataset

2. What happens when it refreshes?
Every time Google Sheets refreshes:

OLD DATA → completely replaced → NEW DATA
So:

❌ It does NOT append

❌ It does NOT keep history

✅ It always shows latest state of that page

3. What happens if you refresh daily?
Let’s say:

Day 1:
Table contains:

EFERT dividend

FFC dividend

Day 3:
New announcement comes:

POL dividend

Now your sheet becomes:

EFERT

FFC

POL

👉 It looks like new data is added, but actually:

the website updated

your sheet just reloaded it

4. Important implication (very important)
If a company announcement disappears from the page later:

👉 It will also disappear from your sheet

So:

❌ No historical tracking

❌ No guarantee you won’t miss older payouts

✅ Only current/latest announcements

5. What we will do later (don’t implement yet)
We will create a system that:

captures new announcements

stores them permanently

avoids duplicates

But for now:
👉 This sheet is just a live feed

Your current understanding (keep this in mind)
This is a live mirror of PSX page

Refresh = overwrite

No history stored yet

If that’s clear, next step:
👉 we’ll convert this messy table into a clean Actions table (Dividend / Bonus / Right extraction)

Just say go ahead.


You said:
Alright, Please proceed to next step

ChatGPT said:
Thought for 21s
Perfect. Next step: create a clean sheet that shows only payout-related rows for companies in your portfolio.

Create a new tab:

Actions
Put these headers in row 1:

A: Company Name
B: Symbol
C: Dividend / Bonus / Right
D: Closure Of Share Transfer Books
Now in A2, paste this:

=FILTER(
  INDEX(PSX_Import!A:ZZ,0,MATCH("Company",PSX_Import!1:1,0)),
  INDEX(PSX_Import!A:ZZ,0,MATCH("Company",PSX_Import!1:1,0))<>"",
  COUNTIF(Symbols[Company Name], INDEX(PSX_Import!A:ZZ,0,MATCH("Company",PSX_Import!1:1,0)))>0
)
What it does:

MATCH("Company", PSX_Import!1:1, 0) finds the Company column

INDEX(...,0,that_column) returns the whole Company column

COUNTIF(Symbols[Company Name], ...) > 0 keeps only companies that exist in your Symbols sheet

FILTER returns only matching rows

In B2, paste this:

=ARRAYFORMULA(IF(A2:A="","",XLOOKUP(A2:A,Symbols[Company Name],Symbols[Symbol],"")))
What it does:

takes company name from column A

matches it in Symbols

returns the symbol

In C2, paste this:

=FILTER(
  INDEX(PSX_Import!A:ZZ,0,MATCH("Dividend / Bonus / Right",PSX_Import!1:1,0)),
  INDEX(PSX_Import!A:ZZ,0,MATCH("Company",PSX_Import!1:1,0))<>"",
  COUNTIF(Symbols[Company Name], INDEX(PSX_Import!A:ZZ,0,MATCH("Company",PSX_Import!1:1,0)))>0
)
In D2, paste this:

=FILTER(
  INDEX(PSX_Import!A:ZZ,0,MATCH("Closure Of Share Transfer Books",PSX_Import!1:1,0)),
  INDEX(PSX_Import!A:ZZ,0,MATCH("Company",PSX_Import!1:1,0))<>"",
  COUNTIF(Symbols[Company Name], INDEX(PSX_Import!A:ZZ,0,MATCH("Company",PSX_Import!1:1,0)))>0
)
After this, Actions should show only rows for stocks in your portfolio, with:

company name

symbol

payout text

closure dates

Why this step matters:

PSX_Import is messy and contains all companies

Actions becomes your portfolio-only shortlist

next step we will extract:

action type (D, B, R)

percentage

entitlement date

Do this and tell me whether the Actions sheet is populating correctly.


You said:
Yes its working, Please proceed further.

ChatGPT said:
Thought for 7s
Great. Now we extract the payout details into separate usable columns. We’re doing this because the official PSX announcement table gives the payout in one combined field like Dividend / Bonus / Right, and we need to split it into type, percent, and entitlement date for calculations.

In your Actions sheet, add these new headers:

E: Action Type
F: Percent
G: Book Close Start
H: Book Close End
I: Entitlement Date
In E2, paste this:

=ARRAYFORMULA(IF(C2:C="","",IF(REGEXMATCH(C2:C,"\((D)\)"),"D",IF(REGEXMATCH(C2:C,"\((B)\)"),"B",IF(REGEXMATCH(C2:C,"\((R)\)"),"R","")))))
What it does:

looks inside the payout text in column C

returns:

D for dividend

B for bonus

R for right

In F2, paste this:

=ARRAYFORMULA(IF(C2:C="","",IFERROR(VALUE(REGEXEXTRACT(C2:C,"(\d+(?:\.\d+)?)\s*%")),"")))
What it does:

extracts the numeric percent from text like 35%

returns 35, 20, 12.5, etc.

In G2, paste this:

=ARRAYFORMULA(IF(D2:D="","",IFERROR(DATE(VALUE(RIGHT(REGEXEXTRACT(D2:D,"^\d{2}/\d{2}/\d{4}"),4)),VALUE(MID(REGEXEXTRACT(D2:D,"^\d{2}/\d{2}/\d{4}"),4,2)),VALUE(LEFT(REGEXEXTRACT(D2:D,"^\d{2}/\d{2}/\d{4}"),2))),"")))
What it does:

takes the first date from the closure range

converts it into a real date value

In H2, paste this:

=ARRAYFORMULA(IF(D2:D="","",IFERROR(DATE(VALUE(RIGHT(REGEXEXTRACT(D2:D,"\d{2}/\d{2}/\d{4}$"),4)),VALUE(MID(REGEXEXTRACT(D2:D,"\d{2}/\d{2}/\d{4}$"),4,2)),VALUE(LEFT(REGEXEXTRACT(D2:D,"\d{2}/\d{2}/\d{4}$"),2))),"")))
What it does:

takes the second date from the closure range

converts it into a real date value

In I2, paste this:

=ARRAYFORMULA(IF(G2:G="","",G2:G-1))
What it does:

entitlement date = one day before book-close start

For now this is a simple version. Later, if needed, we can make it holiday-aware.

After this, your Actions sheet should look like this:

A Company Name

B Symbol

C Payout text

D Closure text

E Action Type

F Percent

G Book Close Start

H Book Close End

I Entitlement Date

Please do this and check:

E shows D/B/R

F shows the percent correctly

G:H:I show real dates

Then I’ll give you the next step: building the final Entitlements sheet that checks whether you actually held the stock on the entitlement date.


You said:
What is Book Closure start and end dates actually are in stocks? And by Entitlement you mean x-date or the date it will be given? Tell me these and proceed to next step

ChatGPT said:
Good question — this is the core concept behind everything you’re building.

1. What is “Book Closure”?
When a company announces a dividend/bonus/right:

They say:

Book Closure: 17 Apr – 21 Apr
Meaning:
During this period:

Company locks its shareholder register

No ownership changes are recognized for entitlement

👉 Think of it as:

“We freeze the list of shareholders to decide who gets the payout”

2. Book Closure Start vs End
Using:

17 Apr – 21 Apr
Start (17 Apr) → register freezes

End (21 Apr) → register reopens

You MUST be a shareholder before this starts

3. What is Entitlement Date?
In your sheet:

Entitlement Date = Book Close Start - 1 day
So:

Closure starts: 17 Apr  
Entitlement date: 16 Apr
4. Is this “Ex-Date”?
Yes — practically:

👉 Entitlement Date ≈ Ex-Date (in PSX context)

Meaning:

If you own shares ON this date → you get dividend

If you buy after this → you DO NOT get it

5. Important difference (very important)
Term	Meaning
Entitlement Date	Eligibility cutoff (what we use)
Ex-Date	Market adjustment day (price drops)
Payment Date	When money is actually paid
👉 You are building logic based on Entitlement Date (correct)

6. Example (your system logic)
Date	Action
15 Apr	You hold EFERT
16 Apr	Entitlement date ✅
17 Apr	Book closure starts
👉 You will get dividend

Date	Action
16 Apr	You SELL all shares
17 Apr	Closure starts
👉 You will NOT get dividend

Now proceed to next step
We now build the final engine: Entitlements sheet

This will:

check if you held shares on entitlement date

calculate dividend / bonus / rights automatically

Step 5: Create Entitlements sheet
Create new tab:

Entitlements
Headers:

A: Symbol  
B: Entitlement Date  
C: Action Type  
D: Percent  
E: Held Qty  
F: Cash Dividend  
G: Bonus/Right Shares
A2 → pull from Actions
=FILTER(Actions!B2:B, Actions!B2:B<>"")
B2
=FILTER(Actions!I2:I, Actions!B2:B<>"")
C2
=FILTER(Actions!E2:E, Actions!B2:B<>"")
D2
=FILTER(Actions!F2:F, Actions!B2:B<>"")
E2 → MOST IMPORTANT (holdings at date)
=ARRAYFORMULA(IF(A2:A="","",
  SUMIFS(Transactions[Qty], Transactions[Symbol], A2:A, Transactions[Trade Date], "<="&B2:B, Transactions[Type], "BUY")
 -SUMIFS(Transactions[Qty], Transactions[Symbol], A2:A, Transactions[Trade Date], "<="&B2:B, Transactions[Type], "SELL")
))
What this does:
calculates holdings as of entitlement date

not current holdings → historical holdings

F2 → Cash Dividend
=ARRAYFORMULA(IF(C2:C<>"D",0,
  E2:E * XLOOKUP(A2:A, Symbols[Symbol], Symbols[Face Value]) * D2:D / 100
))
G2 → Bonus / Right shares
=ARRAYFORMULA(IF(OR(C2:C="B",C2:C="R"),
  E2:E * D2:D / 100,
  0
))
What you now get
For every announcement:

checks if you held stock on correct date

if yes → calculates:

dividend

bonus shares

right shares

Test case (important)
Try this mentally:

EFERT:

Buy 1000

Sell 200

Entitlement date → after sell

Result:

Held Qty = 800 ✅
Set this up and tell me:

values are coming correctly?

especially column E (Held Qty)

Then next we’ll:
👉 make this auto-update + no duplicates + cleaner dashboard 🚀


You said:
Convert all these to structured form as we discussed earlier. Like Actions[Symbol]

ChatGPT said:
Thought for a few seconds
Yes. From now on I’ll write them in structured style wherever possible.

One important rule first:

Google Sheets table references support things like Actions[Symbol]
but not Excel-style current-row references like [@Symbol].
So in calculated columns, we should use:

structured references for source tables, like Transactions[Qty]

the current row cell, like A2 or B2, for the row’s own value

That is the safest working pattern.

Use this Entitlements table structure:

Column	Header
A	Symbol
B	Entitlement Date
C	Action Type
D	Percent
E	Held Qty
F	Cash Dividend
G	Bonus/Right Shares
Assuming your Entitlements table starts on row 2:

In A2:

=FILTER(Actions[Symbol], Actions[Symbol]<>"")
In B2:

=FILTER(Actions[Entitlement Date], Actions[Symbol]<>"")
In C2:

=FILTER(Actions[Action Type], Actions[Symbol]<>"")
In D2:

=FILTER(Actions[Percent], Actions[Symbol]<>"")
Now the important calculated columns.

In the first row of Held Qty:

=IF(A2="","",
  SUMIFS(Transactions[Qty], Transactions[Symbol], A2, Transactions[Trade Date], "<="&B2, Transactions[Type], "BUY")
 -SUMIFS(Transactions[Qty], Transactions[Symbol], A2, Transactions[Trade Date], "<="&B2, Transactions[Type], "SELL")
)
Meaning:

add all buys for that symbol up to entitlement date

subtract all sells for that symbol up to entitlement date

In the first row of Cash Dividend:

=IF(C2<>"D",0,
  E2 * XLOOKUP(A2, Symbols[Symbol], Symbols[Face Value]) * D2 / 100
)
Meaning:

only calculate when type is D

Held Qty × Face Value × Percent

In the first row of Bonus/Right Shares:

=IF(OR(C2="B",C2="R"),
  E2 * D2 / 100,
  0
)
Meaning:

if bonus or right issue, calculate extra shares

otherwise 0

Small correction to my previous version:
for structured style, this formula is better than using ARRAYFORMULA, because your current-row value must come from A2, B2, C2, etc., not unsupported row-table syntax.

So your workflow now is:

spill columns A:D from Actions[...]

use normal row formulas in E:F:G

let the table auto-fill downward

If you want, next I’ll rewrite the Actions extraction formulas too in this same structured style so your whole workbook stays consistent.


You said:
No need. Proceed further and keep this structure in mind except for PSX_Import.

ChatGPT said:
Thought for a few seconds
Good. Now the next step is to make Entitlements show only the rows that actually matter.

Right now, if a company announces something but you had 0 shares on the entitlement date, that row is useless for you. So we’ll create a filtered final table.

Create a new tab:

Payouts
Use these headers:

A: Symbol
B: Entitlement Date
C: Action Type
D: Percent
E: Held Qty
F: Cash Dividend
G: Bonus/Right Shares
In A2, paste this:

=FILTER(Entitlements[A:G], Entitlements[Held Qty]>0)
What it does:

pulls the full Entitlements table

keeps only rows where you actually held shares on that date

So:

if EFERT had a dividend and you held 800 shares → row stays

if POL had a bonus but you held 0 shares that day → row is removed

If you want only cash dividends in a separate small table, then in I1 onward you can make another view.

Headers in I1:O1:

Symbol | Entitlement Date | Action Type | Percent | Held Qty | Cash Dividend | Bonus/Right Shares
In I2:

=FILTER(Entitlements[A:G], Entitlements[Held Qty]>0, Entitlements[Action Type]="D")
And if you want only bonus/right events, in Q1:W1 use the same headers, then in Q2:

=FILTER(Entitlements[A:G], Entitlements[Held Qty]>0, (Entitlements[Action Type]="B")+(Entitlements[Action Type]="R"))
Very short formula explanation:

FILTER(range, condition1, condition2...) keeps only matching rows

Entitlements[Held Qty]>0 means you were eligible

Entitlements[Action Type]="D" means dividend only

( ... ="B") + ( ... ="R") means either bonus or right

This step gives you the final usable output.

After you do this, next we should add one more important column: Net Dividend after tax.


You said:

\=FILTER(Entitlements\[A:G\], Entitlements\[Held Qty\]>0)

Error. I think the syntax is not correct here.

ChatGPT said:
Thought for a couple of seconds
You’re right — that syntax is not valid in Google Sheets tables.

This part is the problem:

Entitlements[A:G]
Google Sheets structured references work for named columns, not for a column-span like Excel-style A:G.

Use the actual sheet range for the returned block, and keep structured reference only for the condition column if you want. But safest is to use normal ranges for both.

Use this in Payouts!A2:

=FILTER(Entitlements!A2:G, Entitlements!E2:E>0)
Why:

Entitlements!A2:G = full output block to return

Entitlements!E2:E>0 = keep only rows where Held Qty is positive

If you want the same idea using the actual Held Qty column meaning:

column E in Entitlements is Held Qty

so only eligible payouts remain

If you also want a dividend-only view, use:

=FILTER(Entitlements!A2:G, Entitlements!E2:E>0, Entitlements!C2:C="D")
If you want bonus/right only:

=FILTER(Entitlements!A2:G, Entitlements!E2:E>0, (Entitlements!C2:C="B")+(Entitlements!C2:C="R"))
So the rule going forward is:

for single source columns, TableName[Column Name] is fine

for multi-column returned blocks, use normal ranges like Sheet!A2:G

Paste the first corrected formula and confirm it works. Then I’ll give you the next step: Net Dividend after tax.


You said:
Alright Move to the next step.

ChatGPT said:
Thought for a couple of seconds
Great. Now add Net Dividend after tax.

In Entitlements, add two more columns:

Column	Header
H	Tax
I	Net Dividend
In the first data row of Tax:

=IF(C2<>"D",0,
  F2 * XLOOKUP(A2, Symbols[Symbol], Symbols[Tax Rate])
)
What it does:

only applies tax on dividends

gets that stock’s tax rate from Symbols

multiplies it by Cash Dividend

In the first data row of Net Dividend:

=IF(C2<>"D",0,F2-H2)
What it does:

dividend after tax

Net = Gross - Tax

Example:

Held Qty = 800

Face Value = 10

Percent = 35

Gross Dividend = 800 × 10 × 35% = 2800

Tax Rate = 15%

Tax = 2800 × 15% = 420

Net Dividend = 2800 - 420 = 2380

Then update your Payouts sheet formula so it includes the new columns too.

In Payouts!A2 use:

=FILTER(Entitlements!A2:I, Entitlements!E2:E>0)
If you want only dividend rows in another area:

=FILTER(Entitlements!A2:I, Entitlements!E2:E>0, Entitlements!C2:C="D")
If you want only bonus/right rows:

=FILTER(Entitlements!A2:I, Entitlements!E2:E>0, (Entitlements!C2:C="B")+(Entitlements!C2:C="R"))
Do this, and then the next step will be the important one: making the sheet keep history instead of overwriting when PSX refreshes.


You said:
How many steps remaining?

ChatGPT said:
You’re very close. Only 2 important steps left (plus 1 optional polish):

Remaining Steps
Step 6 (Important)
👉 Persist data (avoid losing old PSX announcements)
Right now your data is live only → it gets overwritten.
We’ll:

store past announcements

avoid duplicates

keep history

Step 7 (Important)
👉 Automation (Apps Script trigger)
So everything updates automatically:

fetch PSX data

append new records

update entitlements

Step 8 (Optional but recommended)
👉 Dashboard / summary

total dividends received

upcoming payouts

yield per stock

Where you are now
You’ve already built:

✅ Transactions engine

✅ Holdings logic

✅ PSX connection

✅ Action parsing

✅ Entitlement calculation

✅ Net dividend

👉 That’s the hardest 90% done.

If you’re ready, next we’ll do Step 6 (history + no data loss) — this is the most important upgrade before automation.


You said:
Next step

ChatGPT said:
Thought for 6s
Good. Now we make the sheet keep history so PSX refresh does not wipe old announcements.

Create a new tab:

Actions_History
Add these headers in row 1:

A: Key
B: Company Name
C: Symbol
D: Dividend / Bonus / Right
E: Closure Of Share Transfer Books
F: Action Type
G: Percent
H: Book Close Start
I: Book Close End
J: Entitlement Date
K: First Seen On
In this step, do not use formulas in Actions_History. This sheet should be values only.

Now open:

Extensions → Apps Script
Paste this code:

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('PSX Tools')
    .addItem('Append Actions to History', 'appendActionsToHistory')
    .addToUi();
}

function appendActionsToHistory() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const source = ss.getSheetByName('Actions');
  const target = ss.getSheetByName('Actions_History');

  const sourceLastRow = source.getLastRow();
  if (sourceLastRow < 2) return;

  const sourceData = source.getRange(2, 1, sourceLastRow - 1, 9).getValues();
  // A:I from Actions:
  // Company Name, Symbol, Dividend/Bonus/Right, Closure, Action Type,
  // Percent, Book Close Start, Book Close End, Entitlement Date

  const targetLastRow = target.getLastRow();
  const existingKeys = targetLastRow >= 2
    ? new Set(target.getRange(2, 1, targetLastRow - 1, 1).getValues().flat().filter(String))
    : new Set();

  const rowsToAppend = [];

  sourceData.forEach(row => {
    const companyName = row[0];
    const symbol = row[1];
    const payoutText = row[2];
    const closureText = row[3];
    const actionType = row[4];
    const percent = row[5];
    const bookCloseStart = row[6];
    const bookCloseEnd = row[7];
    const entitlementDate = row[8];

    if (!symbol || !actionType || !entitlementDate) return;

    const key = [
      symbol,
      actionType,
      percent,
      formatKeyDate(entitlementDate),
      String(payoutText).trim()
    ].join("|");

    if (!existingKeys.has(key)) {
      rowsToAppend.push([
        key,
        companyName,
        symbol,
        payoutText,
        closureText,
        actionType,
        percent,
        bookCloseStart,
        bookCloseEnd,
        entitlementDate,
        new Date()
      ]);
      existingKeys.add(key);
    }
  });

  if (rowsToAppend.length > 0) {
    target.getRange(targetLastRow + 1, 1, rowsToAppend.length, rowsToAppend[0].length)
      .setValues(rowsToAppend);
  }
}

function formatKeyDate(value) {
  const d = new Date(value);
  if (isNaN(d)) return String(value).trim();
  return Utilities.formatDate(d, Session.getScriptTimeZone(), "yyyy-MM-dd");
}
What this does:

reads all current rows from Actions

builds a unique key using:

symbol

action type

percent

entitlement date

payout text

checks whether that key already exists in Actions_History

appends only new rows

Why the Key column matters:

it prevents duplicates

if PSX shows the same announcement tomorrow again, it will not be added twice

After saving:

Run appendActionsToHistory once

Allow permissions

Refresh the sheet

Use the new menu:

PSX Tools → Append Actions to History
Expected result:

Actions = live current feed

Actions_History = permanent stored announcements

One important note:
your Entitlements and Payouts are still reading from live Actions right now. In the next step, we’ll switch them to use Actions_History and automate the whole flow.




