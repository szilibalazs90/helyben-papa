-- Adatbázis-szintű bérlő-izoláció (PostgreSQL Row Level Security).
-- Az alkalmazás minden kérés elején: SELECT set_config('app.partner_id', '<munkamenet partnerId>', true);
ALTER TABLE "Order" ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_orders ON "Order" USING ("partnerId" = current_setting('app.partner_id', true));
ALTER TABLE "Appointment" ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_appts ON "Appointment" USING ("partnerId" = current_setting('app.partner_id', true));
ALTER TABLE "MenuItem" ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_menu ON "MenuItem" USING ("partnerId" = current_setting('app.partner_id', true));
ALTER TABLE "Service" ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_services ON "Service" USING ("partnerId" = current_setting('app.partner_id', true));
-- A vevőoldali nézetekhez külön szerep/policy kell, amely csak a saját userId sorait engedi.
