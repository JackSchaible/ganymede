﻿namespace Ganymede.Api.Data.Equipment
{
    public abstract class Equipment
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public int Weight { get; set; }
    }
}
