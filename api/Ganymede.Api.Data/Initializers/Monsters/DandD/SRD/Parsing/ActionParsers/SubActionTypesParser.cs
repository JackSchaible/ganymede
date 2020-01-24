using Ganymede.Api.Data.Monsters.Actions;
using System;
using System.Text.RegularExpressions;
using Action = Ganymede.Api.Data.Monsters.Actions.Action;

namespace Ganymede.Api.Data.Initializers.Monsters.DandD.SRD.Parsing.ActionParsers
{
    internal static class SubActionTypesParser
    {
        private static readonly Regex PerDayRegex = new Regex("<strong>(.*) \\(([0-9]+)/Day\\)\\.</strong>(.*)");
        private static readonly Regex RechargeRegex = new Regex("<strong>(.*) \\(Recharge ([0-9]+)(?:-|–)([0-9]+)\\)\\.</strong>(.*)");

        public static bool Parse(string actionString, ApplicationDbContext ctx)
        {
            bool result = true;
            var perDayMatch = PerDayRegex.Match(actionString);

            if (perDayMatch.Success)
                ParsePerDayAction(perDayMatch, ctx);
            else
            {
                var rechargeMatch = RechargeRegex.Match(actionString);

                if (rechargeMatch.Success)
                    ParseRechargeAction(rechargeMatch, ctx);
                else
                    result = false;
            }


            return result;
        }

        private static PerDayAction ParsePerDayAction(Match match, ApplicationDbContext ctx)
        {
            var pdAction = new PerDayAction
            {
                Action = new Action
                {
                    Name = match.Groups[1].Value,
                    Description = match.Groups[3].Value
                },
                NumberPerDay = int.Parse(match.Groups[2].Value)
            };

            ctx.PerDayActions.Add(pdAction);
            return pdAction;
        }

        private static RechargeAction ParseRechargeAction(Match match, ApplicationDbContext ctx)
        {
            var rAction = new RechargeAction
            {
                Action = new Action
                {
                    Name = match.Groups[1].Value,
                    Description = match.Groups[4].Value
                },
                RechargeMin = int.Parse(match.Groups[2].Value),
                RechargeMax = int.Parse(match.Groups[3].Value),
            };

            ctx.RechargeActions.Add(rAction);
            return rAction;
        }
    }
}
