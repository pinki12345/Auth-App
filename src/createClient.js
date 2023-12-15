import { createClient } from "@supabase/supabase-js";


export const supabase = createClient(
    "https://ayvqhzcozwbkntfjnrxq.supabase.co"
    , "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5dnFoemNvendia250ZmpucnhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI1MzgxOTQsImV4cCI6MjAxODExNDE5NH0.lhFgWUMTJrQ99eqMelv05BIg9Jvcr7_3T7WTa6b-zzI")