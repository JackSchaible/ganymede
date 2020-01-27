using Ganymede.Api.Data.Monsters.Actions;
using System.Text.RegularExpressions;
using Action = Ganymede.Api.Data.Monsters.Actions.Action;

namespace Ganymede.Api.Data.Initializers.Monsters.DandD.SRD.Parsers.ActionParsers
{
    internal class SubActionTypesParser
    {
        private static readonly Regex
            PerDayRegex = new Regex(@"<strong>(.*) \(([0-9]+)/Day\)\.</strong>(.*)"),
            RechargeRegex = new Regex(@"<strong>(.*) \(Recharge ([0-9]+)(?:-|–)([0-9]+)\)\.</strong>(.*)");
        private static readonly int
            miName = 1,
            miPDCount = 2,
            miPDDesc = 3,
            miRMin = 2,
            miRMax = 3,
            miRDesc = 4;

        public static bool TryParse(string actionString, ApplicationDbContext ctx, out Action action)
        {
            bool result = true;
            var perDayMatch = PerDayRegex.Match(actionString);

            if (perDayMatch.Success)
                action = ParsePerDayAction(perDayMatch, ctx).Action;
            else
            {
                var rechargeMatch = RechargeRegex.Match(actionString);

                if (rechargeMatch.Success)
                    action = ParseRechargeAction(rechargeMatch, ctx).Action;
                else
                {
                    result = false;
                    action = null;
                }
            }

            return result;
        }

        private PerDayAction ParsePerDayAction(Match match, ApplicationDbContext ctx)
        {
            var pdAction = new PerDayAction
            {
                Action = new Action
                {
                    Name = match.Groups[miName].Value,
                    Description = match.Groups[miPDDesc].Value
                },
                NumberPerDay = int.Parse(match.Groups[miPDCount].Value)
            };

            ctx.PerDayActions.Add(pdAction);
            return pdAction;
        }

        private RechargeAction ParseRechargeAction(Match match, ApplicationDbContext ctx)
        {
            var rAction = new RechargeAction
            {
                Action = new Action
                {
                    Name = match.Groups[miName].Value,
                    Description = match.Groups[miRDesc].Value
                },
                RechargeMin = int.Parse(match.Groups[miRMin].Value),
                RechargeMax = int.Parse(match.Groups[miRMax].Value),
            };

            ctx.RechargeActions.Add(rAction);
            return rAction;
        }
    }
}
